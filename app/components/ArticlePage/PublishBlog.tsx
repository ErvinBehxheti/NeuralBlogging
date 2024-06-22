"use client";
import React, { useState } from "react";
import TextArea from "./TextArea";
import { addArticle } from "@/app/serveractions/AddArticle";

const PublishBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-28">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-lg w-full max-w-4xl glassmorphism">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Write a Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 border border-white shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 border border-white shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              accept="image/*"
            />
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 border border-white shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Content
            </label>
            <div className="relative w-full">
              <TextArea id="content" />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-white bg-opacity-30 border border-white rounded-lg shadow-md backdrop-blur-md text-white font-semibold transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishBlog;
