'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
          {formattedDate}
        </p>
      </div>
    </Link>
  );
};

export default Post;
