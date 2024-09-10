import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import AccountChooser from './AccountChooser'; // Import the AccountChooser component
import EmployeeForm from '../forms/EmployeeForm'; // Import the EmployeeForm component
import CompanyForm from '../forms/CompanyForm'; // Import the CompanyForm component

const CreateAccount = () => {
  const [step, setStep] = useState(1); // State to track the current step of the form
  const [selected, setSelected] = useState(''); // State to store the selected account type

  // Handle selection of account type and proceed to the next step
  const handleSelect = (value) => {
    setSelected(value); // Set the selected account type ('Individual' or 'Company')
    setStep(2); // Move to the second step of the form
  };

  // Handle navigation back to the first step
  const handleBack = () => {
    setStep(1); // Reset to the first step
  };

  return (
    <>
      {/* Header with logo and back button */}
      <div className="p-5 flex justify-left bg-gray-200 align-middle">
        <Link to="/">
          {' '}
          {/* Link back to the home page */}
          <h2 className="text-4xl font-bold cursor-pointer p-5">
            Lunch<span className="text-green-600">tyme</span>
          </h2>
        </Link>
      
      </div>

      {/* Main content area */}
      <div className="h-[100.5vh] flex flex-row items-center justify-center bg-gray-200 border-4">
        {/* Step 1: AccountChooser component */}
        {step === 1 && <AccountChooser handleSelect={handleSelect} selected={selected} />}

        {/* Step 2: Show EmployeeForm if 'Individual' is selected */}
        {step === 2 && selected === 'Individual' && (
          <div className="min-h-screen flex items-center justify-center">
            <EmployeeForm />
          </div>
        )}

        {/* Step 2: Show CompanyForm if 'Company' is selected */}
        {step === 2 && selected === 'Company' && (
          <div className="min-h-screen flex items-center justify-center">
            <CompanyForm />
          </div>
        )}
      </div>
    </>
  );
};

export default CreateAccount;
