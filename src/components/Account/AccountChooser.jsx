import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid'; 
const AccountChooser = ({ handleSelect, selected }) => {
  return (
    <div className="flex justify-center">
      <section className="bg-gray-200 p-10 rounded-lg w-[40rem] flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-1">How are you planning to use Lunchtyme?</h2>
        <p className="text-lg mb-4 text-gray-700 font-[600]">
          We'll streamline your setup experience accordingly.
        </p>
      
        <div className="flex gap-10 justify-center">
        
          <label
            htmlFor="account_type_individual"
            className={`relative cursor-pointer w-[18rem] h-[24rem] bg-white p-5 flex
              flex-col gap-4 rounded-xl justify-center items-center transition-all duration-300
              border-2 ${
              selected === 'Individual'
                ? 'border-green-500 shadow-md'
                : 'border-transparent hover:border-4 hover:border-green-700'
            }`}
            onClick={() => handleSelect('Individual')}
          >
            <input
              type="radio"
              name="account_type"
              id="account_type_individual"
              value="Individual"
              className="hidden"
              checked={selected === 'Individual'}
              onChange={() => handleSelect('Individual')}
            />
            {selected === 'Individual' && (
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <CheckIcon className="w-5 h-5" />
              </div>
            )}
            <img
              src="images/onb-emp.svg"
              alt="Individual Account"
              className="w-[8rem] h-[8rem] object-contain mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">An Employee</h2>
          </label>

          {/* Company Account Option */}
          <label
            htmlFor="account_type_company"
            className={`relative cursor-pointer w-[18rem] h-[24rem] bg-white p-5 flex flex-col gap-4 rounded-xl justify-center items-center transition-all duration-300 border-2 ${
              selected === 'Company'
                ? 'border-green-500 shadow-md'
                : 'border-transparent hover:border-4 hover:border-green-600'
            }`}
            onClick={() => handleSelect('Company')}
          >
            <input
              type="radio"
              name="account_type"
              id="account_type_company"
              value="Company"
              className="hidden"
              checked={selected === 'Company'}
              onChange={() => handleSelect('Company')}
            />
            {selected === 'Company' && (
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <CheckIcon className="w-5 h-5" />
              </div>
            )}
            <img
              src="images/onb-com.svg"
              alt="Company Account"
              className="w-[8rem] h-[8rem] object-contain mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">A Company</h2>
          </label>
        </div>
      </section>
    </div>
  );
};

export default AccountChooser;
