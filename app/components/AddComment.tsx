'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { FaRegComment } from 'react-icons/fa';

type Props = {
  id: string;
};

type Comment = {
  postId?: string;
  comment: string;
};

const AddComment = ({ id }: Props) => {
  const [comment, setComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string = 'toastPostID';

  const { mutate } = useMutation(
    async (data: Comment) => axios.post('/api/posts/addComment', { data }),
    {
      onError: () => {
        toast.error('Error ocurred while adding comment', { id: toastPostID });
        setIsDisabled(false);
      },
      onSuccess: () => {
        toast.success('Comment has been added successfully!', {
          id: toastPostID,
        });
        setComment('');
        setIsDisabled(false);
        queryClient.invalidateQueries(['post-details']);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading('Adding comment...', { id: toastPostID });
    setIsDisabled(true);
    mutate({ comment, postId: id });
  };

  useEffect(() => {
    comment.length > 300 && setIsDisabled(true);
    comment.length <= 300 && setIsDisabled(false);
  }, [comment.length]);
  return (
    <form
      onSubmit={submitComment}
      className=" py-4 px-2 xs:px-3 md:px-4 2xl:px-6 flex flex-col gap-3"
    >
      <h3 className="text-gray-400 font-semibold text-base flex items-center gap-2">
        Add a comment <FaRegComment className="text-sm" />
      </h3>
      <div className="flex flex-col gap-3">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          name="comment"
          className="p-4 text-base bg-gray-50 rounded-md resize-none border-2 outline-none focus:border-red-300"
        />
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold ${
              comment.length > 300 ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {comment.length}/300
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
            Add comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
