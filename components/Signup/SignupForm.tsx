"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const userSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(100),
    email: z.string().min(1, "Email is required!").email("Invalid Email"),
    password: z.string().min(8, "Password must have 8 characters"),
    confirmPassword: z.string().min(1, "Please re-enter your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserFormData = z.infer<typeof userSchema>;

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full poppins">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Get Started
      </h1>
      <h2 className="text-xl font-semibold text-center text-gray-500 mb-6">
        Create your account
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="relative mt-1">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              id="username"
              type="text"
              placeholder="johndoe"
              {...register("username")}
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative mt-1">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("email")}
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              {...register("password")}
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
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
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative mt-1">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              {...register("confirmPassword")}
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
