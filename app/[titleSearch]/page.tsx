import { cookies } from "next/headers";
import Image from "next/image";
import { supabase } from "../utils/supabase";

async function getArticles(params: any) {
  const { titleSearch } = params;

  const { data, error } = await supabase(cookies)
    .from("articles")
    .select("*")
    .eq("titleSearch", titleSearch)
    .single();

  return data;
}

export default async function Post({ params }: { params: any }) {
  const post = await getArticles(params);

  return (
    <>
      <div className="max-w-3xl px-4 max-lg:pt-44 pt-32 pb-12 sm:px-6 lg:px-8 mx-auto min-h-screen">
        <div className="max-w-2xl bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-lg mx-auto">
          <div className="space-y-6">
            {post && post.image && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={`http://res.cloudinary.com/diaxmj0pa/image/fetch/w_auto,f_auto/https://opplwblqtuvbutcbnlbg.supabase.co/storage/v1/object/public/images/${post.image}`}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            )}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold md:text-3xl text-white">
                {post && post.title}
              </h2>
              <p className="text-lg text-gray-400">{post && post.author}</p>
              <p className="text-lg text-gray-200">{post && post.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
