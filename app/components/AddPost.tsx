"use client";

import React, { useState } from "react";

type Props = {};

const AddPost = (props: Props) => {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <form>
      <div className="flex flex-col gap-3">
        <textarea
          id="scrollbar"
          name="Message"
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="border-2 bg-gray-50 resize-none w-full p-3 rounded-lg transition-all border-gray-300 focus:border-red-400/50 outline-none min-h-[115px] max-h-[115px] sm:min-h-[135px] sm:max-h-[135px]"
        ></textarea>
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-red-500">{message.length}/300</p>
          <button
            disabled={isDisabled}
            className="text-sm bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-lg font-bold self-end"
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
