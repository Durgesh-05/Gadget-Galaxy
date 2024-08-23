import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { url } from '../constants';
import { Heading } from '../components/Heading';

export const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/profile`, {
          withCredentials: true,
        });
        const { data } = res.data;
        setUserData({ ...data });
      } catch (e) {
        console.error('Failed to fetch profile Error: ', e);
      }
    };

    fetchProfileData();
  }, []);
  return (
    <div className='font-inter'>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className='flex bg-gray-50 py-12 min-h-screen items-center justify-center'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto'>
            <div className='flex flex-col lg:flex-row items-center'>
              {/* Profile Image and Email */}
              <div className='flex-shrink-0 lg:mr-6'>
                <img
                  src='https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.1950963813.1721542835&semt=ais_hybrid'
                  alt='Profile'
                  className='w-32 h-32 rounded-full border-4 border-gray-300'
                />
              </div>
              <div className='mt-4 lg:mt-0'>
                <Heading
                  text={userData.fullName}
                  className='text-2xl font-bold text-gray-900'
                />

                <p className='text-gray-600'>{userData.email}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className='mt-8'>
              <Heading
                text={userData.fullName}
                className='text-xl font-semibold text-gray-800 mb-4'
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='block text-sm font-medium text-gray-700'>
                    Full Name
                  </p>
                  <p className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'>
                    {userData.fullName}
                  </p>
                </div>
                <div>
                  <p className='block text-sm font-medium text-gray-700'>
                    Email Address
                  </p>
                  <p className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'>
                    {userData.email}
                  </p>
                </div>

                <div>
                  <p className='block text-sm font-medium text-gray-700'>
                    Address
                  </p>
                  <p className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'>
                    {userData.address || 'Address is not added'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
