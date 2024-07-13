"use server";
import SignupForm from "@/components/Signup/SignupForm";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-purple-500/0 to-blue-500">
      <SignupForm />
    </div>
  );
};

export default page;
