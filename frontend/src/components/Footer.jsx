import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-gray-950 text-gray-50 px-4 py-6  flex flex-col md:flex-row items-center justify-between bottom-0 font-inter '>
      <p className='text-lg font-semibold'>
        &copy; 2024 Gadget-Galaxy Products, All rights reserved.
      </p>
      <div className='flex gap-4 mt-4 md:mt-0'>
        <Link to='#' className='text-muted-foreground hover:text-foreground'>
          <FaFacebookF className='text-lg' />
          <span className='sr-only'>Facebook</span>
        </Link>
        <Link to='#' className='text-muted-foreground hover:text-foreground'>
          <FaTwitter className='text-lg' />
          <span className='sr-only'>Twitter</span>
        </Link>
        <Link to='#' className='text-muted-foreground hover:text-foreground'>
          <FaInstagram className='text-lg' />
          <span className='sr-only'>Instagram</span>
        </Link>
      </div>
    </footer>
  );
};
