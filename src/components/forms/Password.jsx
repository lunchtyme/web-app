import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../../utils/APIHelper';

const Password = () => {
  const token = Cookies.get('esp_lunchtyme_id');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load saved email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

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
      // Save the email to localStorage
      localStorage.setItem('email', formData.email);

      const response = await APIHelper.makeSecureAPICall(token).post(
        'auth/request-password-reset',
        { email: formData.email },
      );

      if (response.data.success) {
        setShowSuccessToast(true); // Show success toast
        navigate('/reset-password');
        setMessage(response.data.message);
      } else {
        setError(response.data.message || 'Request failed. Please check your email.');
        setShowToast(true);
      }
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError(err.response?.data?.message || 'An error occurred while requesting the reset.');
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">EMAIL</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
              <Link to="/signup">
                <p className="cursor-pointer hover:underline">Create account.</p>
              </Link>
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
    </>
  );
};

export default Password;
