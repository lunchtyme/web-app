import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleCreateUserSubmit from '../../utils/handleCreateUserSubmit';

const EmployeeForm = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    account_type: 'Individual',
    first_name: 'wertt',
    last_name: '',
    phone_number: '',
    invitation_code: '',
    lunch_time: '',
    dial_code: '+234',
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

      if (createEmployeeAPIResponse?.data) {
        console.log('API Response for Create Employee:', createEmployeeAPIResponse);
        setFormData({
          email: '',
          password: '',
          first_name: 'wertt',
          last_name: '',
          dial_code: '',
          phone_number: '',
          invitation_code: '',
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Reset time_zone
        });

        navigate('/verify');
      } else {
        console.log('API Response for Create Employee:', createEmployeeAPIResponse);
        setError(createEmployeeAPIResponse?.message || 'An error occurred');
      }
    } catch (err) {
      console.error('Error creating employee:', err);
      setError(err?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <div className="flex justify-center p-3">
        <div className="w-full p-6 bg-gray rounded-lg h-auto mb-10">
          <div className="p-5 text-center flex justify-between align-middle">
            <button
              onClick={handleGoBack} // Go back when clicked
              className="btn bg-green-600 hover:bg-green-500 hv text-white text-xl font-semibold rounded-full"
            >
              <img src="images/arrow.svg" className="w-[1.5rem]" alt="" />
            </button>
            <h2 className="text-3xl font-semibold">
              Sign up as an <span className="text-green-700">Employee</span>
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {[
              {
                label: 'FIRST NAME',
                name: 'first_name',
                type: 'text',
                placeholder: 'Enter your first name',
              },
              {
                label: 'LAST NAME',
                name: 'last_name',
                type: 'text',
                placeholder: 'Enter your last name',
              },
              {
                label: 'WORK EMAIL',
                name: 'email',
                type: 'email',
                placeholder: 'Type your work email address',
              },
              {
                label: 'PASSWORD',
                name: 'password',
                type: 'password',
                placeholder: 'Enter a secure password',
              },
              {
                label: 'INVITE CODE',
                name: 'invitation_code',
                type: 'text',
                placeholder: 'Provide invite code',
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="form-control">
                <label className="label">
                  <span className="label-text text-[1rem] font-[500]">{label}</span>
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="input input-bordered w-[30rem] h-[3rem] bg-gray-100"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  aria-label={label}
                />
              </div>
            ))}
            <div className="flex gap-2 w-[30rem]">
              <div className="flex-1">
                <label className="block text-[1rem] font-[500] mb-1">DIAL CODE</label>
                <input
                  type="text"
                  value="+234"
                  onChange={handleChange}
                  className="input input-bordered w-full h-[3rem] bg-gray-100"
                  disabled
                />
              </div>
              <div className="flex-[3]">
                <label className="block text-[1rem] font-[500] mb-1">PHONE NUMBER</label>
                <input
                  name="phone_number"
                  type="text"
                  onChange={handleChange}
                  value={formData.phone_number}
                  className="input input-bordered w-full h-[3rem] bg-gray-100"
                />
              </div>
            </div>
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
