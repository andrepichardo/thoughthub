'use client';
import axios from 'axios';
import AddPost from './components/AddPost';
import { useQuery } from 'react-query';
import Post from './components/Post';

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts'],
  });
  if (error) return error;
  console.log(data);

  return (
    <main className="w-full h-full flex flex-col min-h-[82vh] max-h-[82vh] ">
      <AddPost />
      <hr className="my-4" />
      {isLoading && 'Loading...'}
      <div
        id="scrollbar"
        className="flex flex-col gap-5 px-2 xs:px-3 md:px-4 2xl:px-6 overflow-auto"
      >
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
