import APIHelper from './APIHelper';

const handleCreateUserSubmit = async (formData) => {
  console.log('Form data:', formData);
  try {
    const response = await APIHelper.makeAPICall.post(
      'auth/signup',
      formData,
    );

    console.log('Form successfully submitted:', response.data);
    return response.data;
  } catch (err) {
    console.log('Error submitting form:', err);
    return err.response?.data?.message || 'Failed to submit form. Please try again later.';
  }
};

export default handleCreateUserSubmit;