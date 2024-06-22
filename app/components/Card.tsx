import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <article className="rounded-xl overflow-hidden border border-white border-opacity-0 hover:border-opacity-100">
      <Link
        href={`/${post.titleSearch}`}
        className="block bg-white/20 backdrop-blur-md shadow p-4"
      >
        <div className="relative block h-96 w-full">
          <Image
            className="rounded-lg"
            src={`http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://opplwblqtuvbutcbnlbg.supabase.co/storage/v1/object/public/images/${post.image}`}
            alt={post.title}
            priority
            fill
            objectFit="cover"
          />
        </div>
        <div className="p-2 pt-6 newsreader h-auto text-white">
          <h5 className="mb-2 text-xl font-medium leading-tight">
            {post.title}
          </h5>
          <p className="mb-4 text-base truncate">{post.content}</p>
        </div>
      </Link>
    </article>
  );
};

export default Card;
