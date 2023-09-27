'use client';
import Post from '@/app/components/Post';
import { PostType } from '@/app/types/Post';
import axios from 'axios';
import { Metadata } from 'next';
import { ImSpinner2 } from 'react-icons/im';
import { useQuery } from 'react-query';

type URL = {
  params: {
    slug: string;
  };
};

export const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ['detail-posts'],
    cacheTime: 0,
  });
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px] h-full">
          <ImSpinner2 className="text-5xl text-red-500 animate-spin" />
        </div>
      )}
      <div>
        {data && (
          <Post
            id={data.id}
            username={data.user.name}
            avatar={data.user.image}
            message={data.message}
            comments={data.comments}
            createdAt={data.createdAt}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetail;
