"use server";
import MyBlogs from "@/components/Blogs/MyBlogs";
import { verifyToken } from "@/serveractions/verifyToken";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const userID = await verifyToken();

  if (!userID) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userID as number },
  });

  const authorBlogs = await prisma.blog.findMany({
    where: {
      authorUsername: user?.username,
    },
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto p-4">
        {authorBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <ul>
            <MyBlogs blogs={authorBlogs} />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
