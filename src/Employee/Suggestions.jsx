import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../utils/APIHelper';

const Suggestions = () => {
  const navigate = useNavigate();
  const token = Cookies.get('esp_lunchtyme_id');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    reason_for_suggestion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [data, setData] = useState('');

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
      const response = await APIHelper.makeSecureAPICall(token).post('meal/suggest', formData);

      if (response.data.success) {
        setShowSuccessToast(true); // Show success toast
        setData(response.data);
        console.log(data);
        setFormData({ name: '', description: '', reason_for_suggestion: '' });
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
        setShowToast(true); // Show error toast on failure
      }
    } catch (err) {
      console.error('Error submitting form:', err);
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

      {/* Main content section with login form */}
      <div className="h-[85vh] bg-white flex">
        <div className="w-[100%] p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Add a suggestion.</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="form-control">
              <label className="label">
                <span className="lato-regular label-text text-lg font-medium">NAME</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full h-[3rem] bg-gray-100"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="lato-regular label-text text-lg font-medium">DESCRIPTION</span>
              </label>
              {/* <input
                type="textarea"
                maxlength="100"
                minlength="100"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered h-[3rem] w-full bg-gray-100"
                required
              /> */}
              <textarea
                placeholder="Enter comment..."
                maxlength="1000"
                minlength="10"
                className="border-2 border-gray-300 p-2"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="lato-regular label-text text-lg font-medium">
                  REASON FOR SUGGESTIONS
                </span>
              </label>
              {/* <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered h-[3rem] w-full bg-gray-100"
                required
              /> */}
              <textarea
                placeholder="Enter your reason"
                maxlength="1000"
                minlength="10"
                className="border-2 border-gray-300 p-2"
                name="reason_for_suggestion"
                value={formData.reason_for_suggestion}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="w-full justify-end flex ">
              <button
                type="submit"
                className={`btn ${
                  loading ? 'bg-gray-400' : 'bg-gray-800'
                } text-white text-xl font-semibold`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-4 border-t-transparent border-gray-50 rounded-full animate-spin"></div>
                    </div>
                    <p>Submitting...</p>
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error Toast */}
      {showToast && (
        <div className="toast toast-end toast-top mt-14 mr-10">
          <div className="alert alert-error text-white p-5 rounded font-semibold">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast toast-end toast-top mt-14 mr-10">
          <div className="alert alert-success text-white p-5 rounded  font-semibold">
            <span>Suggestion successfully submitted!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Suggestions;
