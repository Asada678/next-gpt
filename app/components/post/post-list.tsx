import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase-server";
import PostItem from "./post-item";

const getPosts = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select().order("created_at", { ascending: true });

  return data;
};

export default async function PostList() {
  const postsData = await getPosts();
  if (!postsData) return notFound();

  return (
    <div className="mb-40">
      {postsData.map((post) => (
        <PostItem
          key={post.id}
          {...post}
        />
      ))}
    </div>
  );
}
