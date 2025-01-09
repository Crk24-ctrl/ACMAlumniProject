import jwt from "jsonwebtoken";

export default function generateToken(payload: string | Buffer | object) {
  let token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
}
