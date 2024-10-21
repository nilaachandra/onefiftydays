'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

const ProgressBarWrapper = ({ children } : {children:ReactNode}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="black"
        
      />
    </>
  );
};

export default ProgressBarWrapper;