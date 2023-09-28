'use client';
import AddComment from '@/app/components/AddComment';
import Post from '@/app/components/Post';
import { fetchDetails } from '@/app/components/fetchDetails';
import { PostType } from '@/app/types/Post';
import { formatDateAgo } from '@/app/utils/formatDateAgo';
import Image from 'next/image';
import { ImSpinner2 } from 'react-icons/im';
import { useQuery } from 'react-query';

type URL = {
  params: {
    slug: string;
  };
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ['post-details'],
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
          <div className="divide-y-2">
            <Post
              id={data.id}
              username={data.user.name}
              avatar={data.user.image}
              message={data.message}
              comments={data.comments}
              createdAt={data.createdAt}
            />
            <AddComment id={data?.id} />
            <div className="flex flex-col gap-3 py-5 px-2 xs:px-3 md:px-4 2xl:px-6">
              {data.comments.map((comment) => (
                <div
                  className="py-3 px-2 xs:px-3 md:px-4 2xl:px-6 flex items-start gap-3 bg-gray-100 rounded-md"
                  key={comment.id}
                >
                  <Image
                    className="rounded-full"
                    alt="Avatar"
                    src={comment.user.image}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col relative w-full">
                    <p className="font-bold text-red-600">
                      {comment.user.name}
                    </p>
                    <p className="break-all line-clamp-4 text-sm">
                      {comment.comment}
                    </p>
                    <br />
                    <p className="text-xs font-semibold text-gray-400 absolute bottom-0 right-0">
                      {formatDateAgo(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
