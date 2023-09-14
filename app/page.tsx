'use client';
import axios from 'axios';
import AddPost from './components/AddPost';
import { useQuery } from 'react-query';
import { ImSpinner2 } from 'react-icons/im';
import Post from './components/Post';
import { useEffect, useState } from 'react';

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
};

export default function Home() {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= window.innerHeight * 0.02) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts'],
  });
  if (error) return error;

  return (
    <main className="w-full h-full flex flex-col min-h-screen">
      <div
        className={
          shadow
            ? 'fixed max-w-4xl w-full h-[73px] shadow-md'
            : 'fixed max-w-4xl w-full h-[73px]'
        }
      />
      <div className="h-[73px] mb-5" />
      <AddPost />
      <div className="mt-3 mb-0 h-[2.2px] bg-gray-200" />
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px] h-full">
          <ImSpinner2 className="text-5xl text-red-500 animate-spin" />
        </div>
      )}
      {!isLoading && data.length == 0 && (
        <div className="flex items-center justify-center text-gray-300 font-bold text-3xl min-h-[200px] h-full">
          No posts available
        </div>
      )}
      <div className="flex flex-col divide-y-2 flex-grow h-full overflow-hidden rounded-b-lg divide-gray-200 relative">
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
