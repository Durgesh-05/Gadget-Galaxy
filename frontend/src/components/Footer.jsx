import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-gray-100 text-muted-foreground px-4 py-4 lg:px-6 flex flex-col md:flex-row items-center justify-between fixed bottom-0 w-screen font-inter'>
      <p className='text-xs'>&copy; 2024 Acme Products. All rights reserved.</p>
      <div className='flex gap-4 mt-4 md:mt-0'>
        <Link to='#' className='text-muted-foreground hover:text-foreground'>
          <FaFacebookF className='text-xs' />
          <span className='sr-only'>Facebook</span>
        </Link>
        <Link to='#' className='text-muted-foreground hover:text-foreground'>
          <FaTwitter className='text-xs' />
          <span className='sr-only'>Twitter</span>
        </Link>
        <Link to='#' className='text-muted-foreground hover:text-foreground'>
          <FaInstagram className='text-xs' />
          <span className='sr-only'>Instagram</span>
        </Link>
      </div>
    </footer>
  );
};