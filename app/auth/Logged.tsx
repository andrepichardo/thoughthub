'use client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { FiLogOut, FiUser } from 'react-icons/fi';

type User = {
  image: string;
  name: string | null | undefined;
};

const Logged = ({ image, name }: User) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    isLoading
      ? (document.body.style.cursor = 'wait')
      : (document.body.style.cursor = 'default');
  }, [isLoading]);
  return (
    <div className="flex gap-5 items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full gap-2 text-red-500 font-bold items-center justify-center">
            <span className="hidden md:block">{name}</span>
            <Image
              className="rounded-full"
              width={45}
              height={45}
              src={image}
              alt="profile picture"
              priority
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 sm:w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/my-profile">
                    <button
                      className={`${
                        active ? 'bg-red-500 text-white' : 'text-gray-900'
                      } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <FiUser
                        className={`${
                          active ? 'text-red-300' : 'text-red-500'
                        } w-5 h-5`}
                      />
                      My Profile
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={async () => {
                      setIsLoading(true);
                      try {
                        await signOut();
                      } catch (error) {
                        console.error('Sign-out error:', error);
                      }
                    }}
                    disabled={isLoading}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <FiLogOut
                      className={`${
                        active ? 'text-red-300' : 'text-red-500'
                      } w-5 h-5`}
                    />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Logged;
