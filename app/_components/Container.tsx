"use client";

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
<div className="max-w-[2520px] mt-10 xl:px-20 md:px-10 sm:px-2 px-10 mb-0">
  {children}
    </div>
  );
};

export default Container;
