'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const LoadingBar = () => {
  return <ProgressBar height="4px" color="#ef4444" shallowRouting />;
};
export default LoadingBar;
