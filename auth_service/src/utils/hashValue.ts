import bcrypt from "bcrypt";

export default async function (value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashed_value = await bcrypt.hash(value, salt);
  return hashed_value;
}
