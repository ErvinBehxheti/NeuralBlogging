"use server";

import SigninForm from "@/components/Signin/SigninForm";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-purple-500/0 to-blue-500">
      <SigninForm />
    </div>
  );
};

export default page;
