'use client';
import axios from 'axios';
import AddPost from './components/AddPost';
import { useQuery } from 'react-query';

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

  return (
    <main
      id="scrollbar"
      className="w-full h-full flex flex-col max-h-[85vh] overflow-auto"
    >
      <AddPost />
      <hr className="my-4" />
      {isLoading && 'Loading...'}
      {data?.map((post: any, i: any) => (
        <div key={i}>{post.message}</div>
      ))}
    </main>
  );
}
