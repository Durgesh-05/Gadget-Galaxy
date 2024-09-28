import React from 'react';

export const InputBox = ({ text, placeholder, label, value, setValue }) => {
  return (
    <div>
      <label htmlFor={text} className='font-semibold text-lg md:text-base'>
        {label}
      </label>
      <input
        type={
          text === 'email' ? 'email' : text === 'password' ? 'password' : 'text'
        }
        id={text}
        name={text}
        placeholder={placeholder}
        required
        value={value}
        className='border border-gray-300 rounded-md w-full h-10 py-4 px-2 md:h-12 md:py-4'
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};
