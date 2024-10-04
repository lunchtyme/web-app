import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountChooser from './AccountChooser';
import EmployeeForm from '../forms/EmployeeForm';
import CompanyForm from '../forms/CompanyForm';

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('');

  const handleSelect = (value) => {
    setSelected(value);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      <div className="p-5 flex justify-left bg-gray-200 align-middle">
        <Link to="/">
          {' '}
          <h2 className="text-4xl font-bold cursor-pointer p-5">Lunchtyme</h2>
        </Link>
      </div>

      {/* Main content area */}
      <div className="w-auto flex flex-row items-center justify-center bg-gray-200 border-4">
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
