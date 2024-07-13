"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineRocket } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

const CreateAiBlog = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const pathname = usePathname();

  const handleCreateBlogClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <Link
        href="/writearticle"
        className={`flex items-center px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none rounded-lg shadow-lg transform transition-transform hover:scale-105 text-white ${
          pathname === "/writearticle" ? "hidden" : ""
        }`}
        onClick={handleCreateBlogClick}
      >
        <AiOutlineRocket className="mr-1" />
        Create AI Blog
      </Link>
      {showToast && pathname === "/writearticle" && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-4 flex items-center space-x-2 z-30">
          <ClipLoader color="#ffffff" size={20} />
          <span>Getting your creative engine started!</span>
        </div>
      )}
    </>
  );
};

export default CreateAiBlog;
