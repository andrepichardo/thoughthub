'use client';
import Image from 'next/image';
import Link from 'next/link';
import PostOptions from '../components/PostOptions';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDateAgo } from '../utils/formatDateAgo';

type Props = {
  id: string;
  username: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

type Message = {
  postId?: string;
  message: string;
};

const EditPost = ({
  username,
  avatar,
  message,
  comments,
  id,
  createdAt,
  updatedAt,
}: Props) => {
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

  const mutation = useMutation(
    (data: Message) => axios.put('/api/posts/editPost', { data }),
    {
      onError: () => {
        toast.error('Error updating this post', { id: toastPostID });
      },
      onSuccess: () => {
        toast.success('Post has been updated successfully', {
          id: toastPostID,
        });
        queryClient.invalidateQueries(['auth-posts']);
      },
    }
  );

  const editPost = (message: string) => {
    mutation.mutate({ message: message, postId: id });
    toastPostID = toast.loading('Updating post...', { id: toastPostID });
  };

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
              {comments?.length}{' '}
              {comments?.length == 1 ? 'comment' : 'comments'}
            </p>
            <div className="flex flex-col items-end gap-1 absolute bottom-4 right-5">
              {createdAt === updatedAt ? null : (
                <p className="text-[10px] font-semibold text-gray-400 ">
                  Edited {formatDateAgo(updatedAt)}
                </p>
              )}
              <p className="text-xs font-semibold text-gray-400">
                {formatDateAgo(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 rounded-full">
        <PostOptions deletePost={deletePost} editPost={editPost} />
      </div>
    </div>
  );
};

export default EditPost;
