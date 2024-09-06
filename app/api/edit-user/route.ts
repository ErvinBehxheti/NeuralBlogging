import bcrypt from "bcrypt";
import prisma from "@/utils/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const formData = await req.formData();

    const username = formData.get("username") as string | null;
    const email = formData.get("email") as string | null;
    const image = formData.get("image") as File | null;
    const password = formData.get("password") as string | null;
    const userId = formData.get("userID") as string;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required for editing." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "No user found with that ID!" },
        { status: 404 }
      );
    }

    let imageUrl = existingUser.profilePicture;
    console.log("imageUrl1", imageUrl);

    if (image) {
      const { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(image.name, image);

      if (uploadError) {
        console.error("Error uploading image", uploadError);
        return NextResponse.json({ message: "Error uploading image" });
      }

      imageUrl = data?.path || imageUrl;
    }

    console.log("imageUrl2", imageUrl);

    let hashedPassword = existingUser.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        ...(username && { username }),
        ...(email && { email }),
        ...(password && { password: hashedPassword }),
        ...(image && { profilePicture: imageUrl }),
      },
    });

    return NextResponse.json({
      message: "User has been edited successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating the user", error);
    return NextResponse.json(
      { error: "Failed to update the user" },
      { status: 500 }
    );
  }
}
