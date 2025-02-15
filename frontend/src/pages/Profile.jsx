import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [user, setUser] = useState({ name: '', email: '' });

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/profile`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        setUser(response.data.user); 
      } else {
        // Если в ответе success=false, можно обработать ошибку
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Если нет токена — отправляем на логин (или делаем что-то другое)
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center bg-white-50">
        <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Name: </span>
              {user.name}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>
          </div>

          {/* Если есть ещё поля, можно добавить их сюда */}
          {/* <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Прочая информация: </span>
              {user.someField}
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Profile;