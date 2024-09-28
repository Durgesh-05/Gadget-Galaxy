import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { url } from '../utils';
import { Heading } from '../components/Heading';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res.data;
        setUserData(data);
        setEditedData(data);
      } catch (e) {
        console.error('Failed to fetch profile Error: ', e);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const res = await axios.patch(`${url}/api/v1/profile`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(editedData);
      setIsEditing(false);
    } catch (e) {
      console.error('Failed to save profile data. Error: ', e);
    }
  };

  return (
    <div className='font-inter'>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className='flex bg-gray-50 py-12 min-h-screen items-center justify-center mt-12 md:mt-0'>
        <div className='container mx-auto px-6 lg:px-8 '>
          <div className='bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto border border-gray-300'>
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
                  className='text-4xl  lg:font-extrabold'
                />
                <p className='text-gray-600 text-xl'>{userData.email}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className='mt-8'>
              <Heading
                text='Personal Information'
                className='text-2xl font-semibold text-gray-800 mb-4'
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-lg font-medium text-gray-700'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    value={editedData.fullName || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={
                      isEditing
                        ? 'mt-1 block w-full rounded-md  shadow-sm p-2 border border-black'
                        : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
                    }
                  />
                </div>
                <div>
                  <label className='block text-lg font-medium text-gray-700'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={editedData.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={
                      isEditing
                        ? 'mt-1 block w-full rounded-md  shadow-sm p-2 border border-black'
                        : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
                    }
                  />
                </div>

                <div>
                  <label className='block text-lg font-medium text-gray-700'>
                    Address
                  </label>
                  <textarea
                    type='text'
                    name='address'
                    value={editedData.address || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={
                      isEditing
                        ? 'mt-1  w-full rounded-md  shadow-sm p-2 border border-black'
                        : 'mt-1  w-full rounded-md border-gray-300 shadow-sm p-2'
                    }
                  />
                </div>
              </div>

              <div className='mt-6 flex justify-end'>
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className='text-lg font-semibold px-6 py-2 bg-gray-950 text-white rounded-lg hover:bg-gray-800'
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSaveClick}
                    className='text-lg font-semibold px-6 py-2 bg-gray-950 text-white rounded-lg hover:bg-gray-800'
                  >
                    Save
                  </button>
                )}
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
