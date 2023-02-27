import { Suspense } from "react";

import PostList from "./components/post/post-list";
import Loading from "./loading";
import PostNew from "./components/post/post-new";

export default function Page() {
  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Server Component */}
        <PostList />
      </Suspense>
      <PostNew />
    </div>
  );
}
