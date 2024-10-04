import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleCreateUserSubmit from '../../utils/handleCreateUserSubmit';

const EmployeeForm = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate to another component, for example: /another-component
    navigate('/signup');
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    account_type: 'Individual',
    first_name: '',
    last_name: '',
    phone_number: '',
    invitation_code: '',
    dial_code: '+234',
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const createEmployeeAPIResponse = await handleCreateUserSubmit(formData);
      if (createEmployeeAPIResponse?.data) {
        setFormData({
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          dial_code: '',
          phone_number: '',
          invitation_code: '',
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        setShowSuccessToast(true);
        navigate('/verify');
      } else {
        setError(createEmployeeAPIResponse?.message || 'An error occurred');
      }
    } catch (err) {
      setError(err?.message || 'An error occurred');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  return (
    <>
      <div className="flex justify-center p-3">
        <div className="w-full p-6 bg-gray rounded-lg h-auto mb-10 max-w-[40rem]">
          <div className="p-5 text-center flex justify-between items-center">
            {/* <button
              onClick={handleGoBack}
              className="btn bg-green-600 hover:bg-green-500 text-white text-xl font-semibold rounded-full"
            >
              <img src="images/arrow.svg" className="w-[1.5rem]" alt="" />
            </button> */}
            <h2 className="text-2xl md:text-2xl font-semibold">Sign up as an Employee</h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  className="input input-bordered w-full max-w-[30rem] h-[3rem] bg-gray-100"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  aria-label={label}
                />
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[30rem]">
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
              <div className="flex-1">
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
                className={`btn hover:text-gray-600 ${
                  isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700'
                } text-xl text-white w-full`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <p className="text-gray-600">Signing Up...</p>
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-4 border-t-transparent border-gray-700 rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-error text-white p-5">
            <span>{error}</span>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success text-white p-5">
            <span>Signup successful! Redirecting...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeForm;
