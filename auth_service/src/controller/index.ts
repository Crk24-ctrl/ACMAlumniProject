// authController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateRandomUsername, hashValue, generateToken } from "../utils";
import asyncHandler from "express-async-handler";
import validator from "validator";
import nodemailer from "nodemailer";
import { User, Unverified } from "../config/db";
import crypto from "crypto";

export const register = asyncHandler(async (req: Request, res: Response) => {
  let { first_name, last_name, email, password } = req.body;

  if (!first_name || first_name.trim().length === 0) {
    res.status(400);
    throw new Error("Please enter your first name");
  } else {
    first_name = first_name.trim();
  }
  if (!last_name || last_name.trim().length === 0) {
    res.status(400);
    throw new Error("Please enter your last name");
  } else {
    last_name = last_name.trim();
  }
  if (!email || email.trim().length === 0) {
    res.status(400);
    throw new Error("Please enter your email");
  } else {
    email = email.trim();
  }
  if (!password || password.length < 5) {
    res.status(400);
    throw new Error("Minimum password length is 5");
  }
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  const alreadyExists = await User.findOne({
    where: {
      email,
    },
  });
  if (alreadyExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const code = Math.floor(100000 + Math.random() * 900000);
  //
  //
  //
  //
  //
  //
  //
  //
  //      ||       ||   ||              ======     ======    ||         ||   ||\      ||   =======
  //      ||       ||   ||            ||         ||      ||  ||         ||   || \     ||  ||
  //      ||       ||   ||            ||         ||      ||  ||         ||   ||  \    ||  ||
  //      ||=======||   ||            ||         ||======||  ||         ||   ||   \   ||  ||=====
  //      ||       ||   ||            ||         ||      ||  ||         ||   ||    \  ||  ||
  //      ||       ||   ||            ||         ||      ||  ||         ||   ||     \ ||  ||
  //      ||       ||   ||              ======   ||      ||   ========  ||   ||      \||   =======
  //
  //
  //
  //
  //
  //
  //
  //
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let details = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify your email",
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(details, function (err: any) {
    if (err) {
      res.status(500);
      throw new Error("Error happened while sending verification email");
    }
    console.log(`[MAIL SENT] Verification email sent to ${email}`);
  });
  const uuid = crypto.randomBytes(64).toString("hex");
  const hashed_password = await hashValue(password);
  const hashed_code = await hashValue(code.toString());
  const unverified_user = {
    uuid,
    first_name,
    last_name,
    email,
    password: hashed_password,
    code: hashed_code,
  };

  await Unverified.create(unverified_user);

  res.status(200).json({
    uuid,
  });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { code, uuid } = req.body;

  // check if all fields are fulfilled
  if (!code || code.trim().length !== 6) {
    res.status(400);
    throw new Error("Please provide a valid 6-digit code");
  }

  // find user in temp database
  let current_user = await Unverified.findOne({
    where: {
      uuid,
    },
  });

  if (!current_user) {
    res.status(400);
    throw new Error("Account was not found");
  }

  // compare codes
  let correct = await bcrypt.compare(code, current_user.code);

  if (!correct) {
    res.status(400);
    throw new Error("Incorrect code");
  }

  await Unverified.destroy({
    where: {
      email: current_user.email,
    },
    force: true,
  });

  // save current user to database

  let { first_name, last_name, email, password } = current_user;
  const user = await User.create({
    uuid,
    first_name,
    last_name,
    email,
    username: generateRandomUsername(),
    password,
  });

  if (!user) {
    res.status(400);
    throw new Error("Unexpected error happened");
  }

  let { uuid: user_id, email: user_email, username: user_username } = user;

  const token = generateToken({
    uuid: user_id,
    email: user_email,
    username: user_username,
  });

  res.status(200).json({ token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  let { identifier, password } = req.body;
  let isUsername = false;
  // check if all fields are fulfilled
  if (!identifier || identifier.trim().length === 0) {
    res.status(400);
    throw new Error("Please enter your username or email");
  } else {
    identifier = identifier.trim();
  }
  if (!password || password.length === 0) {
    res.status(400);
    throw new Error("Please enter your password");
  }

  // check if identifier is email or username
  if (!identifier.includes("@")) {
    isUsername = true;
  }

  // fetch database
  let user;
  if (isUsername) {
    user = await User.findOne({
      where: {
        username: identifier,
      },
    });
  } else {
    user = await User.findOne({
      where: {
        email: identifier,
      },
    });
  }

  if (!user) {
    // account does not exist or is not verified
    let unverified = await Unverified.findOne({
      where: {
        email: identifier,
      },
    });
    if (unverified) {
      res.status(400);
      throw new Error("Your account is not verified");
    }
    res.status(400);
    throw new Error("Your account does not exist");
  }

  // user is found in the database, compare passwords
  let correct = await bcrypt.compare(password, user.password);

  if (!correct) {
    res.status(400);
    throw new Error("Incorrect password");
  }

  const { uuid, email, username } = user;

  let token = generateToken({ uuid, email, username });

  res.status(200).json({ token });
});
