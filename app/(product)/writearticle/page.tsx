import React from "react";
import { verifyToken } from "@/serveractions/verifyToken";
import Button from "@/components/ArticlePage/Button";
import PublishBlog from "@/components/ArticlePage/PublishBlog";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { User } from "@/types/user";
import { Blog } from "@/types/blog";

const WriteArticle = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const userID = await verifyToken();

  if (!userID) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userID as number },
  });

  const edit = searchParams?.edit === "true";

  let blogToEdit = null;
  let titleToSearch = null;

  if (edit) {
    titleToSearch = searchParams?.blogTitle as string;

    blogToEdit = await prisma.blog.findFirst({
      where: {
        titleSearch: titleToSearch,
      },
    });
  }

  return (
    <div className="min-h-screen relative">
      <Button />
      <PublishBlog user={user} edit={edit} blogToEdit={blogToEdit} />
    </div>
  );
};

export default WriteArticle;
