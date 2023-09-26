'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2 } from 'react-icons/fi';
import PostOptions from '../components/PostOptions';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type Props = {
  id: string;
  username: string;
  avatar: string;
  message: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPost = ({ username, avatar, message, comments, id }: Props) => {
  let toastPostID: string = 'toastPostID';
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error?.response?.data.message, { id: toastPostID });
      },
      onSuccess: () => {
        toast.success('Post has been deleted successfully', {
          id: toastPostID,
        });
        queryClient.invalidateQueries(['auth-posts']);
      },
    }
  );

  const deletePost = () => {
    mutate(id);
    toastPostID = toast.loading('Deleting post...', { id: toastPostID });
  };

  return (
    <div className="relative">
      <Link
        href={`/post/${id}`}
        className="flex items-start justify-between gap-3 py-4 hover:bg-gray-100 px-2 xs:px-3 md:px-4 2xl:px-6"
      >
        <div className="flex items-start gap-3">
          <Image
            className="rounded-full"
            alt="Avatar"
            src={avatar}
            width={50}
            height={50}
          />
          <div className="flex flex-col self-start">
            <p className="font-bold text-red-600">{username}</p>
            <p className="break-all line-clamp-4">{message}</p>
            <p className="text-sm font-bold text-gray-400 mt-3">
              {comments?.length} Comments
            </p>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 rounded-full">
        <PostOptions deletePost={deletePost} />
      </div>
    </div>
  );
};

export default EditPost;
