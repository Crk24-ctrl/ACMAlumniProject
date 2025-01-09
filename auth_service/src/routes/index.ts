import express from "express";
import { login, register, verifyEmail } from "../controller";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);

export default router;
