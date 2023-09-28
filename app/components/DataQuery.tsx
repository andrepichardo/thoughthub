'use client';
import Post from '../components/Post';
import { useQuery } from 'react-query';
import { ImSpinner2 } from 'react-icons/im';
import { PostType } from '../types/Posts';
import axios from 'axios';

export const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
};

const DataQuery = () => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ['posts'],
  });

  return (
    <>
      {error && error}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px] h-full">
          <ImSpinner2 className="text-5xl text-red-500 animate-spin" />
        </div>
      )}
      {!isLoading && data?.length == 0 && (
        <div className="flex items-center justify-center text-gray-300 font-bold text-3xl min-h-[200px] h-full">
          No posts available
        </div>
      )}
      <div className="flex flex-col divide-y-2 flex-grow h-full overflow-hidden rounded-b-lg divide-gray-200">
        {data?.map((post) => (
          <Post
            key={post.id}
            comments={post.comments}
            message={post.message}
            username={post.user.name}
            avatar={post.user.image}
            id={post.id}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default DataQuery;
