import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6 px-4 md:px-6 font-inter'>
      <FrownIcon className='h-20 w-20 text-gray-500 dark:text-gray-400' />
      <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
        Page Not Found
      </h1>
      <p className='text-gray-500 dark:text-gray-400 max-w-md text-center'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to='/'
        className='inline-flex h-10 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900'
      >
        Go to Homepage
      </Link>
    </div>
  );
};

function FrownIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <path d='M16 16s-1.5-2-4-2-4 2-4 2' />
      <line x1='9' x2='9.01' y1='9' y2='9' />
      <line x1='15' x2='15.01' y1='9' y2='9' />
    </svg>
  );
}
