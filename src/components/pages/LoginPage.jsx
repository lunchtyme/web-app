import React, { useState } from 'react'; // Import React and useState hook for state management
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link for navigation
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import APIHelper from '../../utils/APIHelper'; // Import a helper for making API calls

const LoginForm = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [formData, setFormData] = useState({
    identifier: '', // State to hold the user's email
    password: '', // State to hold the user's password
  });

  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target; // Get name and value from the input field
    setFormData({ ...formData, [name]: value }); // Update the formData state with the new value
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true to indicate processing
    setError(null); // Clear any previous errors

    try {
      // Make a POST request to the login API endpoint with form data
      const response = await APIHelper.makeAPICall.post('auth/login', formData);

      if (response.data.success) {
        // Extract access token from response data
        const { accessTokenHash } = response.data.data;

        // Store the access token in a cookie with secure options
        Cookies.set('esp_lunchtyme_id', accessTokenHash, { secure: true });

        // Check if the user is onboarded and navigate accordingly
        if (response.data.onboarded) {
          navigate('/dashboard'); // Navigate to dashboard if onboarded
        } else {
          navigate('/onboarding'); // Navigate to onboarding if not onboarded
        }
      } else {
        // Display error message if login fails
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error logging in:', err); // Log error to console
      // Display error message from the server or a generic message
      setError(err.response?.data?.message || 'An error occurred while logging in.');
    } finally {
      setLoading(false); // Set loading state back to false after processing
    }
  };

  // Handle 'Back' button click to navigate back one page
  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in history
  };

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
              {error && <p className="text-red-500 text-sm">{error}</p>}{' '}
              {/* Display error if exists */}
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
              {loading ? 'Logging in...' : 'Login'} {/* Show loading state text if loading */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm; // Export the LoginForm component
