import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import  localStorageHelper  from '../../utils/localStorage.js';
import APIHelper from '../../utils/APIHelper';

// Define the VerifyOTP component
const VerifyOTP = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only single-digit numeric input
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp]; // Create a copy of the OTP array
      newOtp[index] = value; // Update the specific index with the new value
      setOtp(newOtp); // Update the state with the new OTP array

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      // Focus the previous input if the current field is emptied
      if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    const otpCode = otp.join('');
    console.log('OTP Code:', otpCode);

    const email = localStorageHelper.getLocalStorage('acct_mail');
    if (!email) {
      setError('Email not found. Please try again.');
      setLoading(false);
      return;
    }

    try {
      // Send the OTP code and email to the server for verification
      const response = await APIHelper.makeAPICall.post('auth/confirm-email', {
        otp: otpCode,
        email, // Include the email in the request payload
      });

      if (response.data.success) {
        setSuccess('OTP verified successfully!');
        navigate('/login');
      } else {
        setError(response.data.message || 'OTP verification failed.');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError(err.response?.data?.message || 'An error occurred while verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError(null);
    setSuccess('');

    const email = localStorage.getItem('email');
    if (!email) {
      setError('Email not found. Please try again.');
      setResendLoading(false);
      return;
    }

    try {
      // Send a request to the server to resend the OTP
      const response = await APIHelper.makeAPICall.post('auth/resend-verify-email', { email });

      // Check if the OTP was resent successfully
      if (response.data.success) {
        setSuccess('OTP has been resent successfully.'); // Set success message
      } else {
        setError(response.data.message || 'Failed to resend OTP.'); // Handle failed resend
      }
    } catch (err) {
      // Handle errors such as network issues or server-side errors
      console.error('Error resending OTP:', err);
      setError(err.response?.data?.message || 'An error occurred while resending OTP.'); // Set error message
    } finally {
      setResendLoading(false); // Set resend loading state back to false
    }
  };

  return (
    <>
      <div className="p-10 flex justify-evenly bg-gray-200 align-middle">
        <Link to="/">
          {/* Link back to the home page */}
          <h2 className="text-2xl font-semibold cursor-pointer">
            launch<span className="text-green-600">tyme</span>
          </h2>
        </Link>
        <button
          onClick={handleGoBack} // Go back to the first step when clicked
          className="btn bg-green-600 text-white w-[10rem] text-xl font-semibold"
        >
          Back
        </button>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        {' '}
        {/* Center the form */}
        {/* Container for the OTP verification form */}
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            {/* OTP input fields */}
            <div className="flex space-x-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`} // Unique ID for each input field
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e, index)} // Handle input changes
                  className="w-12 h-12 border border-gray-300 rounded text-center text-xl focus:outline-none"
                  maxLength="1" // Limit each input to a single character
                  aria-label={`OTP input ${index + 1}`} // Accessibility label for screen readers
                />
              ))}
            </div>
            {/* Display error message if present */}
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {/* Display success message if present */}
            {success && <div className="text-green-500 mb-2">{success}</div>}
            {/* Submit button for verifying OTP */}
            <button
              type="submit"
              className={`btn ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'
              } text-white text-lg w-full`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {/* Button to resend OTP */}
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-blue-600 mt-4"
              disabled={resendLoading || loading} // Disable button while resending or verifying
            >
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
