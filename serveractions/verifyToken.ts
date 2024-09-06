import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function verifyToken() {
  const cookies = headers().get("cookie");
  const token = cookies
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return null;
  }

  const secretKey = process.env.SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey!);
    if (typeof decoded !== "string" && "id" in decoded) {
      return decoded.id;
    }
  } catch (error) {
    return null;
  }
}
