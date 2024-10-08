"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/utils/db";

export async function addArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorUsername = formData.get("authorUsername") as string;
  const image = formData.get("image") as File;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  let imageUrl = null;

  if (image) {
    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`articles/${image.name}`, image);

    if (uploadError) {
      console.error("Error uploading image", uploadError);
      return;
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

    redirect("/");
    return { message: "Success" };
  } catch (error) {
    console.error("Error inserting data", error);
    return { message: "Error", error };
  }
}
