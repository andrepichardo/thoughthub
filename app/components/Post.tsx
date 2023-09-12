'use client';

import Image from 'next/image';

type Props = {
  id?: string;
  message: string;
  username: string;
  avatar: string;
};

const Post = ({ message, avatar, username }: Props) => {
  return (
    <div className="flex items-center gap-2 border-2 rounded-xl py-6 px-5">
      <Image
        className="rounded-full"
        alt="Profile Picture"
        src={avatar}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <span>{username}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Post;
