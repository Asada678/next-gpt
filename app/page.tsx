import React, { Suspense } from "react";

// import PostList from "./components/post/post-list";
import Loading from "./loading";
import PostNew from "./components/post/post-new";

const PostList = React.lazy(() => import("./components/post/post-list"));

export default function Page() {
  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
      <PostNew />
    </div>
  );
}
