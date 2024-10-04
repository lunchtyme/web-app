import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../../utils/APIHelper';

const Password2 = () => {
  const token = Cookies.get('esp_lunchtyme_id');
  const savedEmail = localStorage.getItem('email');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: savedEmail,
    otp: '', // New OTP field
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showSuccessToast2, setShowSuccessToast2] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowToast(false);
    setShowSuccessToast(false);

    try {
      const response = await APIHelper.makeSecureAPICall(token).post(
        'auth/reset-password',
        {
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }, // Include OTP in the request
      );

      if (response.data.success) {
        setShowSuccessToast(true); // Show success toast
        navigate('/login');
        setMessage(response.data.message);
      } else {
        setError(response.data.message || 'Request failed. Please check your email.');
        setShowToast(true);
      }
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError(err || 'An error occurred while requesting the reset.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Manage hiding the toasts after 5 seconds
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

  const handleResendOtp = async () => {
    setError(null);
    setResendLoading(true);
    setShowSuccessToast2(false);
    setShowToast2(false);

    if (!savedEmail) {
      setMessage('Email not found');
      setResendLoading(false);
    }

    try {
      const response2 = await APIHelper.makeAPICall.post('auth/request-password-reset', {
        email: savedEmail,
      });
      if (response2.data.success) {
        setMessage('OTP has been resent successfully');
        setResendLoading(true);
        setShowSuccessToast2(true);
      }
    } catch (err) {
      console.error(err.response?.data?.message || 'An error occured');
      setError(err.response?.data?.message || 'An error occured');
      setShowToast2(true);
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (showToast2) {
      const timer = setTimeout(() => {
        setShowToast2(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast2]);

  useEffect(() => {
    if (showSuccessToast2) {
      const timer = setTimeout(() => {
        setShowSuccessToast2(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast2]);

  return (
    <>
      {/* Header section with logo and Back button */}
      <div className="p-10 flex bg-gray-200 align-middle">
        <Link to="/">
          <h2 className="text-4xl font-bold cursor-pointer">Lunchtyme</h2>
        </Link>
      </div>

      {/* Main content section with login form */}
      <div className="h-[85vh] flex items-center justify-center bg-gray-200">
        <div className="w-[25rem] max-w-md p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Reset your password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* OTP Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">OTP</span>
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="input input-bordered w-full h-[3rem] bg-gray-100"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="input input-bordered w-full h-[3rem] bg-gray-100"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Confirm password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="input input-bordered w-full h-[3rem] bg-gray-100"
                required
              />
            </div>

            <button
              type="submit"
              className={`btn w-full ${
                loading ? 'bg-gray-400' : 'bg-gray-800'
              } text-white text-xl font-semibold`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-4 border-t-transparent border-gray-50 rounded-full animate-spin"></div>
                  </div>
                  <p>Sending...</p>
                </>
              ) : (
                'Send'
              )}
            </button>
            <div className="flex gap-5">
              <p onClick={handleResendOtp} className="cursor-pointer hover:underline">
                Resend otp
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Error Toast */}
      {showToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-error text-white p-5 rounded font-semibold">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success text-white p-5 rounded font-semibold">
            <span>{message}</span>
          </div>
        </div>
      )}
      {showToast2 && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-error text-white p-5 rounded font-semibold">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast2 && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success text-white p-5 rounded font-semibold">
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Password2;
