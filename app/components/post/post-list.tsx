import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase-server";
import PostItem from "./post-item";

export default async function PostList() {
  const supabase = createClient();

  const { data: postsData } = await supabase.from("posts").select().order("created_at", { ascending: true });

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
