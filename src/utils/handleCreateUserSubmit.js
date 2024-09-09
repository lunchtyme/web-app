import axios from 'axios';

const handleCreateUserSubmit = async (formData) => {
    console.log('Form data:', formData);
    try {
      const response = await axios.post(
        'https://lunchtyme-api.onrender.com/auth/signup',
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Form successfully submitted:', response.data);
      return response.data;
    } catch (err) {
      console.log('Error submitting form:', err);
      return err.response?.data?.message || 'Failed to submit form. Please try again later.';
    }
  };

  export default handleCreateUserSubmit;