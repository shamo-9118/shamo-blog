import React from 'react';
import type { HeadingProps } from '@/type/Heading';

export const Heading = (props: HeadingProps) => {
  return <h1 className='text-5xl text-[#111] font-bold'>{props.children}</h1>;
};
