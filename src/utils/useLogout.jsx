import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('esp_lunchtyme_id');

    navigate('/');
  };

  return { logout };
};

export default useLogout;
