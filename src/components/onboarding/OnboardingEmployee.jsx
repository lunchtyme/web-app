import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIHelper from '../../utils/APIHelper';
import Cookies from 'js-cookie';

const OnboardingEmployee = () => {
  const token = Cookies.get('esp_lunchtyme_id');
  const [formData, setFormData] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    lunch_time: '',
    allergies: [],
    medical_conditions: [],
    dietary_preferences: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicalChange = (e) => {
    const value = e.target.value;
    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      medical_conditions: allergyList,
    }));
  };

  const handleDietChange = (e) => {
    const value = e.target.value;

    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      dietary_preferences: allergyList,
    }));
  };

  const handleAllergiesChange = (e) => {
    const value = e.target.value;
    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      allergies: allergyList,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the lunch_time to 12-hour format with AM/PM and preserve leading zero
    const convertTimeTo12Hour = (time) => {
      let [hours, minutes] = time.split(':'); // Split hours and minutes
      hours = parseInt(hours, 10); // Convert hours to integer
      const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
      hours = hours % 12 || 12; // Convert hours to 12-hour format

      // Ensure leading zero is preserved for single digit hours
      const formattedHours = hours < 10 ? `0${hours}` : hours;

      return `${formattedHours}:${minutes} ${ampm}`; // Return formatted time
    };

    const formattedData = {
      ...formData,
      lunch_time: convertTimeTo12Hour(formData.lunch_time), // Format the lunch_time
    };

    try {
      const response = await APIHelper.makeSecureAPICall(token).post('auth/onboard', formattedData);
      if (response.data.success) {
        navigate('/worker/overview');
      }
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <>
      <section className="w-full bg-gray-200 h-auto">
        <section className="p-6 md:p-10 w-full">
          <h1 className="text-2xl md:text-4xl font-semibold text-center tracking-tight">
            Let's complete your Lunchtyme setup!
          </h1>
        </section>

        <section className="w-full">
          <form className="card-body w-full md:w-[40rem] mx-auto" onSubmit={handleSubmit}>
            {/* Delivery Address Fields */}
            <div className="form-control">
              <h2 className="text-lg md:text-[1.3rem] p-3 pl-0 font-semibold">DELIVERY ADDRESS</h2>
              <p className="text-md md:text-lg mb-3 tracking-tight font-semibold">
                Ensures your order is delivered to the correct address.
              </p>
              <label className="label">
                <span className="label-text text-[1rem]">
                  ADDRESS LINE 1 <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                placeholder="Enter street address 1"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">ADDRESS LINE 2</span>
              </label>
              <input
                type="text"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
                placeholder="Enter street address 2"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">
                  CITY <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">
                  STATE <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">
                  COUNTRY <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">
                  ZIP CODE <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                placeholder="Enter zip code"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>

            {/* Lunch Preference Fields */}
            <div className="mt-8">
              <h2 className="text-lg md:text-[1.3rem] font-semibold p-3 pl-0">LUNCH PREFERENCE</h2>
              <p className="text-md md:text-lg tracking-tight font-semibold">
                Choose your lunch delivery time to get your food fresh.
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  LUNCH TIME <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="time"
                name="lunch_time"
                value={formData.lunch_time}
                onChange={handleChange}
                className="input input-bordered focus:outline-none"
                required
              />
            </div>

            {/* Health Information Fields */}
            <div className="mt-8">
              <h2 className="text-lg md:text-[1.3rem] font-semibold p-3 pl-0">
                HEALTH INFORMATION <span className="text-[1rem]">(OPTIONAL)</span>
              </h2>
              <p className="text-md md:text-lg tracking-tight font-semibold">
                Health information is needed to check your food suggestions.
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">ALLERGIES</span>
              </label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies.join(', ')} // Join array for display
                onChange={handleAllergiesChange}
                placeholder="Enter allergies, separated by commas"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">MEDICAL CONDITIONS</span>
              </label>
              <input
                type="text"
                name="medical_conditions"
                value={formData.medical_conditions.join(', ')} // Join array for display
                onChange={handleMedicalChange}
                placeholder="Enter medical conditions, separated by commas"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-[1rem]">DIETARY PREFERENCES</span>
              </label>
              <input
                type="text"
                name="dietary_preferences"
                value={formData.dietary_preferences.join(', ')} // Join array for display
                onChange={handleDietChange}
                placeholder="Enter dietary preferences, separated by commas"
                className="input input-bordered focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="text-lg lato-bold btn bg-gray-800 text-white hover:bg-gray-600"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default OnboardingEmployee;
