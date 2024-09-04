// Import necessary modules from React and other libraries
import React, { useState } from 'react'; // React core and useState for state management
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation between routes
import handleCreateUserSubmit from '../utils/handleCreateUserSubmit'; // Custom function to handle form submission
import { localStorageHelper } from '../utils/localStorage'; // Helper for local storage operations

// Define the CompanyForm component
const CompanyForm = () => {
  const navigate = useNavigate(); // Hook for navigation
  // Initialize form data state with empty fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    website: '',
    dial_code: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(''); // State to track errors

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target
    setFormData({ ...formData, [name]: value }); // Update formData with the new value
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true when submitting

    try {
      // Call the API to create a user with form data
      const createEmployeeAPIResponse = await handleCreateUserSubmit(formData);

      // Check if the API response contains data
      if (createEmployeeAPIResponse && createEmployeeAPIResponse.data) {
        console.log('API Response for Create Employee:', createEmployeeAPIResponse); // Log the API response
        // Reset form data to initial empty state
        setFormData({
          email: '',
          password: '',
          account_type: '',
          name: '',
          website: '',
          size: '',
          max_spend_amount_per_employee: '',
          dial_code: '',
          phone_number: '',
        });
        // Save the email to local storage
        localStorageHelper.saveToLocalStorage('acct_mail', formData.email);
        // Navigate to the verify page
        navigate('/verify');
      } else {
        // If no data, set error message from API response or a default message
        console.log('API Response for Create Employee:', createEmployeeAPIResponse);
        setError(createEmployeeAPIResponse.message || 'An error occurred');
      }
    } catch (error) {
      // Handle any errors during submission
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  // Render the form component
  return (
    <div className="min-h-screen flex items-center justify-center">
      {' '}
      {/* Center the form on the screen */}
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {' '}
        {/* Form container */}
        <div className="p-5 text-center">
          {' '}
          {/* Form header */}
          <h2 className="text-3xl font-semibold">
            Sign up as a <span className="text-green-700">Company</span>
          </h2>
        </div>
        {/* Display error message if present */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {/* Form element with onSubmit handler */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Array of form fields with labels and input fields */}
          {[
            { label: 'Company Email', name: 'email', type: 'email', placeholder: 'Comapany Email' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Password' },
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Company Name' },
            { label: 'Website', name: 'website', type: 'text', placeholder: 'Website' },
            { label: 'Dial Code', name: 'dial_code', type: 'text', placeholder: 'Dial Code' },
            {
              label: 'Phone Number',
              name: 'phone_number',
              type: 'text',
              placeholder: 'Phone Number',
            },
          ].map(({ label, name, type, placeholder }) => (
            // Map through fields to render input elements
            <div key={name} className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">{label}</span>
              </label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="input input-bordered"
                value={formData[name]}
                onChange={handleChange}
                required
                aria-label={label}
              />
            </div>
          ))}

          {/* Submit button with conditional styles based on loading state */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'
              } text-xl w-full`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
