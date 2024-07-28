import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcrypt";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(100, "Username is too long"),
  email: z.string().min(1, "Email is required!").email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = signupSchema.parse(body);

    if (username && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          username,
          name: username,
          password: hashedPassword,
        },
      });
    }

    return NextResponse.json("User registered successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
