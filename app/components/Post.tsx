'use client';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id?: string;
  message: string;
  username: string;
  avatar: string;
  comments: Object[] | undefined;
};

const Post = ({ message, username, avatar, id, comments }: Props) => {
  return (
    <Link
      href={`/post/${id}`}
      className="flex items-start gap-3  py-4 px-2 xs:px-3 md:px-4 2xl:px-6 relative hover:bg-gray-100"
    >
      <Image
        className="rounded-full"
        alt="Profile Picture"
        src={avatar}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <p className="font-bold text-red-600">{username}</p>
        <p className="break-all line-clamp-4">{message}</p>
        <p className="text-sm font-bold text-gray-400 mt-3">
          {comments?.length} Comments
        </p>
      </div>
    </Link>
  );
};

export default Post;
