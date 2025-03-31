'use client';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { signIn, getProviders } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import Google from '@/public/assets/google.svg';
import Github from '@/public/assets/github-mark.svg';

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isLoading
      ? // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (document.body.style.cursor = 'wait')
      : // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (document.body.style.cursor = 'default');
  }, [isLoading]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <li className="list-none">
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-bold"
        onClick={openModal}
      >
        Sign In
      </button>
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
                    Login to your account
                    <FiX
                      onClick={closeModal}
                      size="24"
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-400 cursor-pointer"
                    />
                  </Dialog.Title>
                  <div className="px-4 sm:px-10 py-6">
                    <div className="flex flex-col gap-3">
                      {providers &&
                        Object.values(providers).map((provider) => (
                          <div className="w-full" key={provider.name}>
                            <button
                              type="button"
                              className={`px-5 py-5 w-full ${
                                isLoading &&
                                'cursor-wait text-gray-300 !bg-gray-100'
                              }  bg-white relative border-2 border-red-100 hover:bg-gray-100 shadow-lg rounded-lg font-semibold outline-none text-xs xs:text-sm sm:text-base`}
                              onClick={async () => {
                                setIsLoading(true);
                                try {
                                  await signIn(provider.id);
                                } catch (error) {
                                  console.error('Sign-out error:', error);
                                }
                              }}
                              disabled={isLoading}
                            >
                              {provider.name === 'Google' && (
                                <Image
                                  className="absolute left-3 sm:left-4 top-0 bottom-0 m-auto w-[25px] h-[25px] xs:w-[30px] xs:h-[30px] sm:w-[40px] sm:h-[40px]"
                                  width={40}
                                  height={40}
                                  src={Google}
                                  alt=""
                                />
                              )}
                              {provider.name === 'GitHub' && (
                                <Image
                                  className="absolute left-3 sm:left-4 top-0 bottom-0 m-auto w-[25px] h-[25px] xs:w-[30px] xs:h-[30px] sm:w-[40px] sm:h-[40px]"
                                  width={40}
                                  height={40}
                                  src={Github}
                                  alt=""
                                />
                              )}
                              Sign in with {provider.name}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </li>
  );
};
export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers },
  };
}
