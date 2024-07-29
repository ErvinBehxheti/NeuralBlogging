"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const userSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Invalid Email"),
  password: z.string().min(8, "Password must have 8 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

const SigninForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto poppins">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Log In
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <label className="block text-gray-700">Email</label>
          <FaEnvelope className="absolute left-3 top-9 text-gray-400" />
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700">Password</label>
          <FaLock className="absolute left-3 top-9 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            {...register("password")}
            className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Log In
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-700">Don&apos;t have an account?</p>
          <Link href="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
