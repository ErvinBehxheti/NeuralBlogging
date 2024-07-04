import { cookies } from "next/headers";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import { FaUserAlt } from "react-icons/fa";

async function getArticles(params: any) {
  const { titleSearch } = params;

  const { data, error } = await supabase(cookies)
    .from("articles")
    .select("*")
    .eq("titleSearch", titleSearch)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export default async function Post({ params }: { params: any }) {
  const post = await getArticles(params);

  return (
    <main className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900/0 min-h-screen text-white pt-24">
      <div className="max-w-4xl px-4 py-12 mx-auto lg:px-8">
        <div className="bg-white/30 bg-opacity-10 glassmorphism rounded-xl p-8 shadow-lg mx-auto">
          {post && post.image && (
            <div className="relative h-72 rounded-lg overflow-hidden mb-6">
              <Image
                src={`http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://opplwblqtuvbutcbnlbg.supabase.co/storage/v1/object/public/images/${post.image}`}
                alt={post.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl font-extrabold text-white mb-4">
            {post?.title}
          </h1>
          <p className="text-lg flex items-center gap-2 text-gray-300 mb-6">
            <FaUserAlt /> {post?.author}
          </p>
          <div className="text-lg text-gray-100">
            <p>{post?.content}</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
