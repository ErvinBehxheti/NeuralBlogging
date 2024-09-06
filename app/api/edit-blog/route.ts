import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/utils/db";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorUsername = formData.get("authorUsername") as string;
    const blogToEditId = formData.get("blogToEdit") as string;
    const image = formData.get("image") as File | null;

    if (!blogToEditId) {
      return NextResponse.json(
        { error: "Blog post ID is required for editing." },
        { status: 400 }
      );
    }

    let imageUrl = null;

    const existingBlogPost = await prisma.blog.findUnique({
      where: { id: parseInt(blogToEditId) },
    });

    if (!existingBlogPost) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 }
      );
    }

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

    const updatedBlogPost = await prisma.blog.update({
      where: { id: parseInt(blogToEditId) },
      data: {
        title,
        titleSearch,
        content,
        authorUsername,
        ...(image && { imageUrl: imageUrl }),
      },
    });

    return NextResponse.json({
      message: "Blog post updated successfully!",
      blog: updatedBlogPost,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post." },
      { status: 500 }
    );
  }
}
