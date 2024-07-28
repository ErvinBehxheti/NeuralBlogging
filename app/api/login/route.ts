import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { email: user.email, username: user.username, name: user.name },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Error during login: ", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
