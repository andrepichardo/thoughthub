'use client';
import axios from 'axios';
import { useQuery } from 'react-query';
import { AuthPosts } from '../types/authPosts';
import { ImSpinner2 } from 'react-icons/im';
import EditPost from './EditPost';

type Props = {};

const fetchAuthPosts = async () => {
  const response = await axios.get('/api/posts/authPosts');
  return response.data;
};

const MyPosts = (props: Props) => {
  const { data, error, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ['auth-posts'],
  });
  return (
    <>
      {error && error}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px] h-full">
          <ImSpinner2 className="text-5xl text-red-500 animate-spin" />
        </div>
      )}
      <div className="flex flex-col divide-y-2 flex-grow h-full overflow-hidden rounded-b-lg divide-gray-200 relative">
        {data?.posts?.map((post) => (
          <EditPost
            key={post.id}
            id={post.id}
            avatar={data.image}
            username={data.name}
            message={post.message}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default MyPosts;
