export default function generateRandomUsername() {
  let random_number = Math.floor(100000000 + Math.random() * 900000000);
  return "user" + random_number.toString();
}
