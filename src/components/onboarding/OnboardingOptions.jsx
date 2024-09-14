import React, { useState, useEffect } from 'react';
import OnboardingCompany from './OnboardingCompany';
import OnboardingEmployee from './OnboardingEmployee';
import Cookies from 'js-cookie';
import APIHelper from '../../utils/APIHelper';

const OnboardingOptions = () => {
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
      <div
        className="w-full h-[100vh] bg-gray-200 flex justify-center align-middle
      border-2 border-red-700"
      >
        <div className="my-auto">
          <h2 className="text-3xl">Loading...</h2>
        </div>
      </div>
    );
  }
  

  return <>{accountType === 'Company' ? <OnboardingCompany /> : <OnboardingEmployee />}</>;
};

export default OnboardingOptions;
