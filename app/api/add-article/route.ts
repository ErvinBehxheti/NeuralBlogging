"use server";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma from "@/utils/db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorUsername = formData.get("authorUsername") as string;
  const image = formData.get("image") as File | null;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  let imageUrl = null;

  if (image) {
    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`articles/${image.name}`, image);

    if (uploadError) {
      console.error("Error uploading image", uploadError);
      return NextResponse.json({ message: "Error", error: uploadError });
    }

    imageUrl = data?.path;
  }

  const titleSearch = title
    ?.trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        titleSearch,
        content,
        authorUsername,
        imageUrl,
      },
    });

    // await sendPushNotifications(title, content, titleSearch);
    return NextResponse.json({ message: "Success", blog: newBlog });
  } catch (error) {
    console.error("Error inserting data", error);
    return NextResponse.json({ message: "Error", error });
  }
}
