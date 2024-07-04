"use client";
import React, { useState } from "react";
import TextArea from "./TextArea";
import { addArticle } from "@/app/serveractions/AddArticle";
import { motion } from "framer-motion";
import {
  AiOutlineForm,
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

const PublishBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append(
        "content",
        (document.getElementById("content") as HTMLTextAreaElement).value
      );
      formData.append("author", author);
      if (image) {
        formData.append("image", image);
      }

      await addArticle(formData);
      setSuccessMessage("Blog post created successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-gradient-to-t from-purple-500/0 to-blue-500/30 poppins">
      <motion.div
        className="bg-white bg-opacity-30 glassmorphism rounded-xl p-8 shadow-lg w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create a New Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <AiOutlineForm className="text-2xl text-white" />
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-30 border border-white rounded-xl shadow-md caret-current"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <AiOutlineUser className="text-2xl text-white" />
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-30 border border-white rounded-xl shadow-md caret-current"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <AiOutlineUpload className="text-2xl text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-white bg-opacity-30 border border-white rounded-xl shadow-md caret-current"
            />
          </div>
          <TextArea id="content" />
          <motion.button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-800 ${
              isSubmitting ? "cursor-wait opacity-50" : ""
            }`}
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </motion.button>
          {isSubmitting && (
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-white bg-opacity-30 rounded-xl overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          )}
          {successMessage && (
            <div className="flex items-center space-x-2 text-green-500">
              <AiOutlineCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="flex items-center space-x-2 text-red-500">
              <AiOutlineExclamationCircle />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default PublishBlog;
