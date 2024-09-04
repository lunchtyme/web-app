// src/components/OnboardingOptions.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the OnboardingOptions component
const OnboardingOptions = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="bg-gray-100 p-5 flex justify-around">
        <h2 className="text-2xl font-semibold">
          launch<span className="text-green-600">tyme</span>
        </h2>
        <button onClick={handleGoBack} className="btn text-white bg-green-600 text-lg w-[8rem]">
          Back
        </button>
      </div>
      <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Container for the onboarding options */}
        <h2 className="text-3xl font-semibold text-gray-800">
          I'm using launch<span className="text-green-600">tyme</span>
        </h2>
        <h3 className="text-2xl mt-3 font-semibold text-gray-900">
          We'll streamline the process for you
        </h3>
        <div className="bg-white p-6 rounded-lg mt-5 shadow-lg w-auto">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">I am registering as....</h2>
          {/* Container for buttons */}
          <div className="flex gap-4 flex-wrap">
            {/* Button for Option 1 */}
            <Link to="/employee">
              <div
                // Call handleOptionClick with 'option1' when clicked
                className="w-[18rem] h-[20rem] bg-gray-200 p-5 flex
                flex-col gap-10 rounded-xl justify-center hover:border-2 hover: border-green-500"
              >
                <div className="w-[8rem] border-2 mx-auto p-">
                  <img src="images/onb-emp.svg" alt="" className="mx-auto" />
                </div>
                <h2 className="text-xl font-semibold text-center">An Individual</h2>
              </div>
            </Link>
            {/* Button for Option 2 */}
            <Link to="/company">
              <div
                // Call handleOptionClick with 'option1' when clicked
                className="w-[18rem] h-[20rem] bg-gray-200 p-5 flex
                flex-col gap-10 rounded-xl justify-center hover:border-2 hover: border-green-500"
              >
                <div className="w-[8rem] border-2 mx-auto p-">
                  <img src="images/onb-com.svg" alt="" className="mx-auto" />
                </div>
                <h2 className="text-xl font-semibold text-center">A Company</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingOptions;
