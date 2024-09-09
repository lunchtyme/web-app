// Importing necessary modules and components from React, React Router, and Axios
import React, { useState, useEffect } from 'react';
import OnboardingCompany from './OnboardingCompany';
import OnboardingEmployee from './OnboardingEmployee';
import axios from 'axios'; // Axios is used for making HTTP requests
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

// Define the OnboardingOptions component, which decides which onboarding form to render
const OnboardingOptions = () => {
  const [accountType, setAccountType] = useState(null);

  // Retrieve the access token from the cookie
  const token = Cookies.get('access_token');

  // Triggers a data fetch when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch the account type from an API
    const fetchAccountType = async () => {
      try {
        // Replace '/api/endpoint' with the actual endpoint URL that returns account type data
        const response = await axios.get('https://lunchtyme-api.onrender.com/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the retrieved token here
          },
        });

        // Destructure account_type from the response data object
        const { account_type } = response.data;

        // Update the accountType state with the fetched account_type value
        setAccountType(account_type);
      } catch (error) {
        // Log an error message to the console if the request fails
        console.error('Error fetching account type:', error);
      }
    };

    // Call the fetchAccountType function to initiate the data fetching process
    fetchAccountType();
  }, [token]); // Add token as a dependency in case it changes

  // Render a loading state while the accountType data is still being fetched
  if (accountType === null) {
    return (
      <div className="w-full h-[100vh] bg-gray-200 flex justify-center align-middle border-2 border-red-700">
        <div className="my-auto">
          <h2 className="text-3xl">Loading...</h2>
        </div>
      </div>
    ); // Display a loading message while waiting for the response
  }

  // Render the OnboardingCompany component if accountType is 'company'
  // Otherwise, render the OnboardingEmployee component
  return <>{accountType === 'company' ? <OnboardingCompany /> : <OnboardingEmployee />}</>;
};

export default OnboardingOptions;
