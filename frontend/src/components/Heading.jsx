import React from 'react';

export const Heading = ({ text, className }) => {
  return <h1 className={`${className} font-bold text-black`}>{text}</h1>;
};
