import React, { useState, useEffect } from 'react';
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
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIHelper.makeSecureAPICall(token).post('auth/onboard', formData);
      if (response.status === 200) {
        navigate('/worker/overview');
      }
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const [empName, setEmpName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response2 = await APIHelper.makeSecureAPICall(token).get('auth/me');
      const fetchedData = response2.data.data;
      setEmpName(fetchedData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  ADDRESS LINE 2 <span className="text-red-600">&#42;</span>
                </span>
              </label>
              <input
                type="text"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
                placeholder="Enter street address 2"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
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
            <div className="form-control">
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
            <div className="form-control">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[1rem]">
                  ZIPCODE <span className="text-red-600">&#42;</span>
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
                placeholder="Enter preferred lunch time"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn text-white bg-gray-800 text-lg">
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
