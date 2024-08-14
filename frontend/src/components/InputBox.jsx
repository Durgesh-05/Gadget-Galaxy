import React from 'react';

export const InputBox = ({ text, placeholder, label, value, setValue }) => {
  return (
    <div>
      <label htmlFor={text} className='text-xs font-semibold'>
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
        className='border border-gray-300 rounded-md w-full py-1 px-1 placeholder:px-1 placeholder:text-xs text-xs'
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};
