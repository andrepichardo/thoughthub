'use client';

import { Dialog, Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { SlOptionsVertical } from 'react-icons/sl';

type Props = {
  deletePost: () => void;
};

const PostOptions = ({ deletePost }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function deletePostAndCloseModal() {
    deletePost();
    closeModal();
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left rounded-full">
        <Menu.Button className=" text-red-500 p-1.5 rounded-full hover:bg-gray-200">
          <SlOptionsVertical />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 z-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <FiEdit2
                      className={`${
                        active ? 'text-red-300' : 'text-red-500'
                      } w-4 h-4`}
                    />
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openModal}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <FiTrash2
                      className={`${
                        active ? 'text-red-300' : 'text-red-500'
                      } w-4 h-4`}
                    />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* ---------------------DELETE MODAL------------------------- */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex text-center justify-center relative py-4 font-medium leading-6 text-white bg-red-500"
                  >
                    Are you sure? 😥
                    <FiX
                      onClick={closeModal}
                      size="24"
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-400 cursor-pointer"
                    />
                  </Dialog.Title>
                  <div className="flex flex-col gap-4 px-4 sm:px-10 py-6">
                    <p className="text-sm font-semibold text-justify">
                      This will delete this post permanently. You cannot undo
                      this action.
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={closeModal}
                        className="text-sm bg-white border-2 border-red-500 hover:bg-gray-200 text-red-500 px-4 py-2 rounded-lg font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={deletePostAndCloseModal}
                        className="text-sm bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostOptions;
