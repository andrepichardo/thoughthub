'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const AddPost = () => {
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostID: string = 'toastPostID';
  const queryClient = useQueryClient();
  // Create a post
  const { mutate } = useMutation(
    async (message: string) =>
      await axios.post('/api/posts/addPost', { message }),
    {
      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(error?.response?.data.message, { id: toastPostID });
        setIsDisabled(false);
      },
      onSuccess: () => {
        toast.success('Post has been made successfully👍', { id: toastPostID });
        setMessage('');
        setIsDisabled(false);
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading('Creating post...', { id: toastPostID });
    setIsDisabled(true);
    mutate(message);
  };

  useEffect(() => {
    message.length > 300 && setIsDisabled(true);
    message.length <= 300 && setIsDisabled(false);
  }, [message.length]);

  return (
    <form onSubmit={submitPost} className="px-2 xs:px-3 md:px-4 2xl:px-6">
      <div className="flex flex-col gap-3">
        <textarea
          id="scrollbar"
          name="Message"
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="border-2 bg-gray-50 resize-none w-full p-3 rounded-lg transition-all border-gray-300 focus:border-red-400/50 outline-none min-h-[95px] max-h-[95px] sm:min-h-[105px] sm:max-h-[105px]"
        ></textarea>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold ${
              message.length > 300 ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {message.length}/300
          </p>
          <button
            disabled={isDisabled}
            className={`text-sm  ${
              isDisabled
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-400'
            } text-white px-5 py-2 rounded-lg font-bold self-end`}
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
