"use server";
import Card from "@/components/Card";
import MainSection from "@/components/MainSection";
import { supabase } from "@/utils/supabase";
import { cookies } from "next/headers";

const Home = async () => {
  const { data: articles } = await supabase(cookies)
    .from("articles")
    .select("*");

  return (
    <div className="min-h-screen">
      <MainSection />
      <div className="max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14 mx-auto">
        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:pb-24">
          {articles?.map((post) => (
            <Card post={post} key={post?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
