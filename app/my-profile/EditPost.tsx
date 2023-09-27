'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2 } from 'react-icons/fi';
import PostOptions from '../components/PostOptions';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
  username: string;
  avatar: string;
  createdAt: string;
  message: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPost = ({
  username,
  avatar,
  message,
  comments,
  id,
  createdAt,
}: Props) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const originalDate = new Date(createdAt);
    const now = new Date();

    const timeDifference = now.getTime() - originalDate.getTime();
    const secondsAgo = Math.floor(timeDifference / 1000);

    let formattedString = '';

    if (secondsAgo >= 1 && secondsAgo <= 2) {
      formattedString = '1 second ago';
    } else if (secondsAgo < 60) {
      formattedString = `${secondsAgo} seconds ago`;
    } else if (secondsAgo >= 60 && secondsAgo <= 120) {
      formattedString = '1 minute ago';
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      formattedString = `${minutesAgo} minutes ago`;
    } else if (secondsAgo >= 3600 && secondsAgo <= 7200) {
      formattedString = '1 hour ago';
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      formattedString = `${hoursAgo} hours ago`;
    } else if (secondsAgo >= 86400 && secondsAgo <= 172800) {
      formattedString = '1 day ago';
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      formattedString = `${daysAgo} days ago`;
    }

    setFormattedDate(formattedString);
  }, [createdAt]);

  let toastPostID: string = 'toastPostID';
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onError: () => {
        toast.error('Error deleting this post', { id: toastPostID });
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
          <div className="flex flex-col self-start w-full ">
            <p className="font-bold text-red-600">{username}</p>
            <p className="break-all line-clamp-4">{message}</p>
            <p className="text-sm font-bold text-gray-400 mt-3">
              {comments?.length} Comments
            </p>
            <p className="text-xs font-semibold text-gray-400 absolute bottom-4 right-5">
              {formattedDate}
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
