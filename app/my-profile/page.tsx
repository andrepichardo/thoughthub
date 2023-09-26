import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MyPosts from './MyPosts';
import AddPost from '../components/AddPost';

export const metadata: Metadata = {
  title: 'My Profile',
};

type Props = {};

export default async function MyProfile({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('api/auth/signin');
  }
  return (
    <main className="w-full h-full flex flex-col flex-grow">
      <h1 className="text-2xl font-bold text-red-500 px-2 xs:px-3 md:px-4 2xl:px-6 mb-4">
        Welcome back, {session?.user?.name}!
      </h1>
      <AddPost />
      <div className="mt-4 h-[2.2px] bg-gray-200" />
      <MyPosts />
    </main>
  );
}
