import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className='flex gap-x-2 items-center px-4 py-2 text-xs md:text-base rounded-md bg-yellow-400 text-stone-600 hover:bg-yellow-300 hover:text-stone-800'
    >
      {children}
    </button>
  );
};

export default Button;