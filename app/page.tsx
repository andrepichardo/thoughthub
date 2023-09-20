import AddPost from './components/AddPost';
import DataQuery from './components/DataQuery';
import axios from 'axios';
import NavbarShadow from './components/NavbarShadow';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | ThoughtHub ',
};

// Fetch all posts
export const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
};

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col min-h-screen">
      <NavbarShadow />
      <AddPost />
      <div className="mt-3 mb-0 h-[2.2px] bg-gray-200" />
      <DataQuery />
    </main>
  );
}
