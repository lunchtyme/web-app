import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import APIHelper from '../../utils/APIHelper'

const OnboardingEmployee = () => {
  const [formData, setFormData] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    lunch_time: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIHelper.makeAPICall.post(
        'auth/onboard',
        formData,
      );
      if (response.status === 200) {
        navigate('/dashboard'); // Redirect to the success page or desired route
      }
    } catch (error) {
      console.error('Error submitting the form', error);
      // Handle error here (show an error message, etc.)
    }
  };

  return (
    <>
      <section className="w-full bg-gray-200 h-auto">
        <section className="p-10 w-full">
          <h1 className="text-4xl font-[600] text-center tracking-tight">
            Let's complete your Lunchtyme setup, John!
          </h1>
        </section>

        <section className="w-full">
          <form className="card-body w-[40rem] mx-auto" onSubmit={handleSubmit}>
            <div className="form-control">
              <h2 className="text-[1.3rem] p-3 pl-0 font-[600]">DELIVERY ADDRESS</h2>
              <p className="text-lg mb-3 tracking-tight font-semibold">
                Ensures your order is delivered to the correct address.
              </p>
              <label className="label">
                <span className="label-text text-[1rem]">
                  ADDRESS LINE 1 <span className="text-red-600 w-20">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.address_line_1}
                onChange={handleChange}
                placeholder="Enter street address 1"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  ADDRESS LINE 2 <span className="text-md">(OPTIONAL)</span>
                </span>
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.address_line_2}
                onChange={handleChange}
                placeholder="Enter street address 2"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  CITY <span className="text-red-600 w-20">&#42;</span>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  STATE <span className="text-red-600 w-20">&#42;</span>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  COUNTRY <span className="text-red-600 w-20">&#42;</span>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  ZIPCODE <span className="text-red-600 w-20">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="zipcode"
                value={formData.zip_code}
                onChange={handleChange}
                placeholder="Enter zip code"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="mt-[2rem]">
              <h2 className="text-[1.3rem] font-[600] p-3 pl-0">LUNCH PREFERENCE</h2>
              <p className="text-lg tracking-tight font-semibold">
                Choose your lunch delivery time to get your food fresh.
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  LUNCH TIME <span className="text-red-600 w-20">&#42;</span>
                </span>
              </label>
              <input
                type="time"
                name="lunchTime"
                value={formData.lunch_time}
                onChange={handleChange}
                placeholder="Enter preferred lunch time"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn text-white bg-green-600 text-lg">
                Save
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default OnboardingEmployee;
