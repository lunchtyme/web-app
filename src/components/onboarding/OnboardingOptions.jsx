import React, { useState, useEffect } from 'react';
import OnboardingCompany from './OnboardingCompany';
import OnboardingEmployee from './OnboardingEmployee';
import Cookies from 'js-cookie';
import APIHelper from '../../utils/APIHelper';
import { useNavigate } from 'react-router-dom';

const OnboardingOptions = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState(null);

  const token = Cookies.get('esp_lunchtyme_id');

  useEffect(() => {
    const fetchAccountType = async () => {
      try {
        const response = await APIHelper.makeSecureAPICall(token).get('auth/me');
        const { account_type } = response.data.data;
        console.log(response);

        setAccountType(account_type);
      } catch (error) {
        console.error('Error fetching account type:', error.data);
      }
    };

    fetchAccountType();
  }, [token]);

  if (accountType === null) {
    return (
      <div className="w-full h-[100vh] bg-gray-200 flex justify-center align-middle">
        <div className="my-auto flex items-center gap-3">
          <div className="flex justify-center">
            <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {accountType === 'Company' ? (
        <OnboardingCompany />
      ) : accountType === 'Individual' ? (
        <OnboardingEmployee />
      ) : accountType === 'Admin' ? (
        navigate('/admin/overview')
      ) : null}
    </>
  );
};

export default OnboardingOptions;
