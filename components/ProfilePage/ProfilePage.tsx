"use client";
import { User } from "@/types/user";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

type TUser = {
  user: {
    id: number;
    email: string;
    profilePicture: string | null;
    name: string | null;
    username: string;
    password: string;
  } | null;
};

const ProfilePage = ({ user }: TUser) => {
  const [email, setEmail] = useState(user ? user.email : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userID", String(user?.id));
    formData.append("username", username);
    formData.append("email", email);

    if (password) {
      formData.append("password", password);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/edit-user", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setStatusMessage("Profile updated successfully!");
        window.location.reload();
      } else {
        setStatusMessage(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log(error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      {statusMessage && <p className="text-red-500">{statusMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="p-6 grid justify-center">
          <label className="block text-lg font-semibold mb-2 truncate text-center">
            Change Profile Picture
          </label>
          <div className="flex justify-center items-center">
            {preview ? (
              <Image
                src={preview}
                alt="Profile Preview"
                width={96}
                height={96}
                className="rounded-full w-24 h-24 object-cover"
              />
            ) : user?.profilePicture ? (
              <Image
                src={`http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://ycrkkvrjsrwtfpblbwrq.supabase.co/storage/v1/object/public/images/${user.profilePicture}`}
                alt={user.username}
                width={96}
                height={96}
                className="rounded-full w-24 h-24 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex justify-center items-center bg-black/80 text-white text-4xl font-bold">
                {user?.username[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <AiOutlineUpload className="text-2xl text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-white bg-opacity-30 border border-white rounded-xl shadow-md caret-current"
            />
          </div>
        </div>

        {/* Username Change */}
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">
            Change Username
          </label>
          <input
            type="text"
            className="w-full p-3 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={user?.username}
          />
        </div>

        {/* Email Change */}
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">
            Change Email
          </label>
          <input
            type="email"
            className="w-full p-3 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user?.email}
          />
        </div>

        {/* Password Change */}
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">
            Change Password
          </label>
          <input
            type="password"
            className="w-full p-3 bg-transparent border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 bg-opacity-50 hover:bg-opacity-80 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
