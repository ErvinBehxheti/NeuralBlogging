import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { verifyToken } from "@/serveractions/verifyToken";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const userID = await verifyToken();

  if (!userID) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userID as number },
  });

  return (
    <div>
      <ProfilePage user={user} />
    </div>
  );
};

export default page;
