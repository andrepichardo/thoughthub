'use client';

import Image from 'next/image';

type Props = {
  id?: string;
  message: string;
  username: string;
  avatar: string;
};

const Post = ({ message, username, avatar }: Props) => {
  return (
    <div className="flex items-start gap-3  py-4 px-2 xs:px-3 md:px-4 2xl:px-6 cursor-pointer relative hover:bg-gray-100">
      <Image
        className="rounded-full"
        alt="Profile Picture"
        src={avatar}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <p className="font-bold text-red-700">{username}</p>
        <p className="break-all line-clamp-4">{message}</p>
      </div>
    </div>
  );
};

export default Post;
