import { cookies } from "next/headers";
import { supabase } from "./utils/supabase";
import Card from "./components/Card";

const Home = async () => {
  const { data: articles } = await supabase(cookies)
    .from("articles")
    .select("*");

  return (
    <div className="max-w-[85rem] h-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-24">
        {articles?.map((post) => (
          <Card post={post} key={post?.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
