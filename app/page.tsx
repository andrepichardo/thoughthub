"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "react-query";
import Post from "./components/Post";

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;

  return (
    <main className="w-full h-full flex flex-col ">
      <div className="h-[69px] mb-5" />
      <AddPost />
      <div className="mt-3 mb-0 h-[2.2px] bg-gray-200" />
      {isLoading && "Loading..."}
      <div className="flex flex-col divide-y-2 bg-white overflow-hidden rounded-b-lg divide-gray-200 relative">
        {data?.map((post: any, i: any) => (
          <Post
            key={post.id}
            message={post.message}
            username={post.user.name}
            avatar={post.user.image}
          />
        ))}
      </div>
    </main>
  );
}
