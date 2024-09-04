import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate for routing

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to manage loading state while logging in
  const [loading, setLoading] = useState(false);
  // State to manage error messages
  const [error, setError] = useState(null);

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setError(null); // Clear previous error messages

    try {
      // Send login request to the API
      const response = await axios.post('https://lunchtyme-api.onrender.com/auth/login', formData); // Replace URL with your API endpoint

      if (response.data.success) {
        // Navigate to the dashboard or another page upon successful login
        navigate('/dashboard'); // Replace '/dashboard' with your desired route
      } else {
        // Set error message if login fails
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Handle errors such as network issues or server-side errors
      console.error('Error logging in:', err);
      setError(err.response?.data?.message || 'An error occurred while logging in.');
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const navigate2 = useNavigate();

  const handleGoBack = () => {
    navigate2(-1); // Navigate to the previous page
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
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Display error message if any */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn w-full ${loading ? 'bg-gray-400' : 'bg-green-600'} text-white`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
