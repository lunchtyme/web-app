import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleCreateUserSubmit from '../../utils/handleCreateUserSubmit';
import localStorageHelper from '../../utils/localStorage.js';

const CompanyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    account_type: 'Company',
    website: '',
    dial_code: '+234',
    phone_number: '',
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the API to create a user with form data
      const createEmployeeAPIResponse = await handleCreateUserSubmit(formData);

      // Check if the API response contains data
      if (createEmployeeAPIResponse && createEmployeeAPIResponse.data) {

        setFormData({
          email: '',
          password: '',
          account_type: '',
          name: '',
          website: '',
          dial_code: '',
          phone_number: '',
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });

        localStorageHelper.saveToLocalStorage('acct_mail', formData.email);
        localStorageHelper.saveToLocalStorage('comp_name', formData.name);

        navigate('/verify');
      } else {
        setError(createEmployeeAPIResponse.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      {/* Center the form on the screen */}
      <div className="w-full p-6 bg-gray-200 rounded-lg mb-24">
        {/* Form container */}
        <div className="p-5 text-center">
          {/* Form header */}
          <h2 className="text-3xl font-semibold">Sign up as a Company</h2>
        </div>
        {/* Display error message if present */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {/* Form element with onSubmit handler */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Array of form fields with labels and input fields */}
          {[
            {
              label: 'COMPANY NAME',
              name: 'name',
              type: 'text',
              placeholder: 'Enter company name',
            },
            {
              label: 'COMPANY EMAIL',
              name: 'email',
              type: 'email',
              placeholder: 'Type company email',
            },
            {
              label: 'COMPANY WEBSITE',
              name: 'website',
              type: 'text',
              placeholder: 'Enter company website',
            },
            {
              label: 'PASSWORD',
              name: 'password',
              type: 'password',
              placeholder: 'Enter a secure password',
            },
            {
              label: 'DIAL CODE',
              name: 'dial_code',
              type: 'text',
              placeholder: '+234',
              isReadonly: true,
            },
            {
              label: 'PHONE NUMBER',
              name: 'phone_number',
              type: 'text',
              placeholder: 'Enter phone number',
            },
          ].map(({ label, name, type, placeholder, isReadonly, value }) => (
            <div key={name} className="form-control">
              <label className="label">
                <span className="label-text text-[1rem] font-[500]">{label}</span>
              </label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="input input-bordered w-[20rem] md:w-[30rem] h-[3rem] bg-gray-100 "
                value={value ? value : formData[name]}
                onChange={handleChange}
                required
                aria-label={label}
                {...(isReadonly ? { disabled: true } : {})}
              />
            </div>
          ))}

          {/* Submit button with conditional styles based on loading state */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800'
              } text-xl w-[20rem] md:w-full`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
