"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export type Post = {
  post: {
    id: number;
    author: string;
    image: string;
    title: string;
    titleSearch: string;
    content: string;
  };
};

const Card = ({ post }: Post) => {
  return (
    <motion.article
      className="rounded-xl overflow-hidden border border-transparent bg-gradient-to-br from-purple-500/30 to-blue-500/30 shadow-lg hover:shadow-2xl transition-all duration-300 text-black"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={`/${post.titleSearch}`} className="block bg-opacity-10 p-4">
        <div className="relative h-64 w-full mb-4">
          <Image
            className="rounded-lg object-cover"
            src={`http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://opplwblqtuvbutcbnlbg.supabase.co/storage/v1/object/public/images/${post.image}`}
            alt={post.title}
            priority
            fill
            sizes="(max-width: 600px) 100vw, 300px"
          />
        </div>
        <div className="p-4 text-white">
          <h5 className="text-2xl font-bold mb-2 truncate">{post.title}</h5>
          <p className="text-sm h-24 overflow-hidden text-ellipsis mb-4">
            {post.content}
          </p>
          <div className="flex items-center text-sm">
            <FaUserAlt className="text-white mr-2" />
            <span className="text-gray-300">{post.author}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default Card;
