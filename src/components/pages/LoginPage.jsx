import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../../utils/APIHelper';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
      const response = await APIHelper.makeAPICall.post('auth/login', formData);

      if (response.data.success) {
        const { accessTokenHash, onboarded } = response.data.data;

        Cookies.set('esp_lunchtyme_id', accessTokenHash, { secure: true });

        const result = await APIHelper.makeSecureAPICall(accessTokenHash).get('auth/me');

        setShowSuccessToast(true); // Show success toast

        setTimeout(() => {
          if (response.data.data.onboarded === false) {
            navigate('/onboarding');
          } else {
            navigate('/auth-onboard');
          }
        }, 2000); // Give 1 second for the success toast to display
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
        setShowToast(true); // Show error toast on failure
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.message || 'An error occurred while logging in.');
      setShowToast(true); // Show error toast on failure
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

  return (
    <>
      {/* Header section with logo and Back button */}
      <div className="p-10 flex bg-gray-200 align-middle">
        <Link to="/">
          <h2 className="text-4xl font-bold cursor-pointer">
            Lunch<span className="text-green-600">tyme</span>
          </h2>
        </Link>
      </div>

      {/* Main content section with login form */}
      <div className="h-[85vh] flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md p-8 bg-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-[500]">EMAIL</span>
              </label>
              <input
                type="email"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full bg-transparent h-[3rem]"
                required
              />
            </div>

            {/* Password input field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-[500]">PASSWORD</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered h-[3rem] w-full bg-transparent"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`btn w-full ${
                loading ? 'bg-gray-400' : 'bg-green-600'
              } text-white text-xl font-semibold`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      {/* Error Toast */}
      {showToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-error text-white p-5">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success text-white p-5">
            <span>Login successful! Redirecting...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
