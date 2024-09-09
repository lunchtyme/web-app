import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://lunchtyme-api.onrender.com/auth/login', formData);

      if (response.success) {
        // Extract access_token from response data
        const { access_token } = response.data;
        

        // Store the access_token in a cookie
        Cookies.set('access_token', access_token, { expires: 7 }); // Expires in 7 days

        navigate('/onboarding');
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.message || 'An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="p-10 flex justify-evenly bg-gray-200 align-middle">
        <Link to="/">
          <h2 className="text-2xl font-semibold cursor-pointer">
            launch<span className="text-green-600">tyme</span>
          </h2>
        </Link>
        <button
          onClick={handleGoBack}
          className="btn bg-green-600 text-white w-[10rem] text-xl font-semibold"
        >
          Back  
        </button>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md p-8 bg-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-[500]">EMAIL</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full bg-transparent h-[3rem]"
                required
              />
            </div>

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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`btn w-full ${loading ? 'bg-gray-400' : 'bg-green-600'} text-white text-xl font-semibold`}
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
