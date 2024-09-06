"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { Blog } from "@/types/blog";
import Image from "next/image";

type TBlog = {
  blogs: Blog[];
};

type TConfirmationModal = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

const MyBlogs = ({ blogs }: TBlog) => {
  const [blogIdToDelete, setBlogIdToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: number) => {
    setBlogIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setBlogIdToDelete(null);
    setIsModalOpen(false);
  };

  const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
  }: TConfirmationModal) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this blog?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const deleteBlog = async () => {
    if (!blogIdToDelete) return;

    try {
      const response = await fetch(`/api/delete-blog`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: blogIdToDelete }),
      });

      if (response.ok) {
        closeModal();
        window.location.reload();
      } else {
        console.error("Failed to delete the blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">My Blogs</h1>
      <div className="grid grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            className="bg-black bg-opacity-40 p-6 rounded-lg shadow-lg glassmorphism"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              {blog.imageUrl ? (
                <Image
                  src={`http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://opplwblqtuvbutcbnlbg.supabase.co/storage/v1/object/public/images/${blog.imageUrl}`}
                  alt={blog.title}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <Image
                  src={"/logo/logo-512.png"}
                  alt={"null"}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link
                  href={`/writearticle?edit=true&blogTitle=${blog.titleSearch}`}
                  className="hover:scale-110 p-2 bg-blue-600 bg-opacity-50 hover:bg-opacity-80 rounded-full"
                >
                  <FiEdit className="text-white" />
                </Link>
                <button
                  className="hover:scale-110 p-2 bg-red-600 bg-opacity-50 hover:bg-opacity-80 rounded-full"
                  onClick={() => openModal(blog.id)}
                >
                  <FiTrash2 className="text-white" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-white">{blog.title}</h2>
              <p className="text-sm text-gray-400">
                By {blog.authorUsername} on{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 mt-2 line-clamp-3">{blog.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={deleteBlog}
      />
    </div>
  );
};

export default MyBlogs;
