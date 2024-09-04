import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleCreateUserSubmit from '../utils/handleCreateUserSubmit';
import { localStorageHelper } from '../utils/localStorage';

const EmployeeForm = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    account_type: '',
    first_name: '',
    last_name: '',
    dial_code: '',
    phone_number: '',
    invitation_code: '',
    lunch_time: '',
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('Form data:', formData);
    try {
      const createEmployeeAPIResponse = await handleCreateUserSubmit(formData);

      if (createEmployeeAPIResponse && createEmployeeAPIResponse.data) {
        console.log('API Response for Create Employee:', createEmployeeAPIResponse);
        setFormData({
          email: '',
          password: '',
          account_type: '',
          first_name: '',
          last_name: '',
          dial_code: '',
          phone_number: '',
          invitation_code: '',
          lunch_time: '',
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Reset time_zone
        });

        localStorageHelper.saveToLocalStorage('acct_mail', formData.email);
        navigate('/verify');
      } else {
        console.log('API Response for Create Employee:', createEmployeeAPIResponse);
        setError(createEmployeeAPIResponse.message || 'An error occurred');
      }
    } catch (err) {
      console.log('Error creating employee:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg mt-24  mb-24">
          <div className="p-5 text-center">
            <h2 className="text-3xl font-semibold">
              Sign up as an <span className="text-green-700">Employee</span>
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {[
              { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'First Name' },
              { label: 'Last Name', name: 'last_name', type: 'text', placeholder: 'Last Name' },
              { label: 'Work email', name: 'email', type: 'email', placeholder: 'Work email' },
              { label: 'Password', name: 'password', type: 'password', placeholder: 'Password' },

              { label: 'Dial Code', name: 'dial_code', type: 'text', placeholder: 'Dial Code' },
              {
                label: 'Phone Number',
                name: 'phone_number',
                type: 'text',
                placeholder: 'Phone Number',
              },
              {
                label: 'Invitation Code',
                name: 'invitation_code',
                type: 'text',
                placeholder: 'Invitation Code',
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">{label}</span>
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="input input-bordered"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  aria-label={label}
                />
              </div>
            ))}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700'
                } text-xl text-white w-full`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
