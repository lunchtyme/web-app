import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import APIHelper from '../../utils/APIHelper'; 

const LoginForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    identifier: '', 
    password: '', 
  });
  const [accountType, setAccountType] = useState(null);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

 
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
     
      const response = await APIHelper.makeAPICall.post('auth/login', formData);

      if (response.data.success) {
        const { accessTokenHash, onboarded } = response.data.data;

        Cookies.set('esp_lunchtyme_id', accessTokenHash, { secure: true });

        const result = await APIHelper.makeSecureAPICall(accessTokenHash).get('auth/me');
        const { account_type } = result.data.data;

        console.log(accountType);

        if (account_type === 'Admin' || response.data.data.onboarded) {
          navigate('/admin/overview');
        } else {
          navigate('/onboarding');
        }
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

  // useEffect(() => {
  //   // fetch api
  //   const fetchAccountType = async () => {
  //     try {
  //       // Replace endpoint
  //       const response = await APIHelper.makeSecureAPICall(accessTokenHash).get('auth/me');
  //       const { account_type } = response.data.data;
  //       console.log(response);

  //       setAccountType(account_type);
  //     } catch (error) {
  //       console.error('Error fetching account type:', error.data);
  //     }
  //   };

  //   fetchAccountType();
  // }, [accessTokenHash]); // Add token as a dependency in case it changes

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
              {loading ? 'Logging in...' : 'Login'} 
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
