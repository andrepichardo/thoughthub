'use client';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateAgo } from '../utils/formatDateAgo';

type Props = {
  id?: string;
  message: string;
  username: string;
  avatar: string;
  comments: Object[] | undefined;
  createdAt: string;
};

const Post = ({
  message,
  username,
  avatar,
  id,
  comments,
  createdAt,
}: Props) => {
  return (
    <Link
      href={`/post/${id}`}
      className="flex items-start gap-3 py-4 px-2 xs:px-3 md:px-4 2xl:px-6 hover:bg-gray-100"
    >
      <Image
        className="rounded-full"
        alt="Avatar"
        src={avatar}
        width={50}
        height={50}
      />
      <div className="flex flex-col relative w-full">
        <p className="font-bold text-red-600">{username}</p>
        <p className="break-all line-clamp-4">{message}</p>
        <p className="text-sm font-bold text-gray-400 mt-3">
          {comments?.length} Comments
        </p>
        <p className="text-xs font-semibold text-gray-400 absolute bottom-0 right-0">
          {formatDateAgo(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default Post;
