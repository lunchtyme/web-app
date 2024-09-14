import React, { useState } from 'react';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Menu = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categories: '',
  });

  const token = Cookies.get('esp_lunchtyme_id');
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
      // Post request
      const response = await APIHelper.makeSecureAPICall(token).post('food-menu/new', formData);
      console.log(response.data.data);
      if (response.status === 200) {
        // Handle successful response
        alert('Menu item added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          categories: '',
        });
      } else {
        throw new Error('Failed to create menu item');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="">
        <h2 className="text-2xl">Create Menu</h2>
        <div className="h-uto flex items-center justify-center bg-gray-200">
          <div className="w-full max-w-md p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Add Menu Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name input field */}
              <div className="form-control">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <label className="label">
                  <span className="label-text text-md font-[500]">NAME</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input input-bordered w-full bg-transparent h-[3rem]"
                  required
                />
              </div>

              {/* Description input field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-md font-[500]">DESCRIPTION</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your menu"
                  className="input input-bordered h-[3rem] w-full bg-transparent"
                  required
                />
              </div>

              {/* Price input field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-md font-[500]">PRICE</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="input input-bordered h-[3rem] w-full bg-transparent"
                  required
                />
              </div>

              {/* Categories input field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-md font-[500]">CATEGORIES</span>
                </label>
                <input type="checkbox" name="categories" id="Soup" value="Soup" />
                Soup
                <input type="checkbox" name="categories" id="Soup" value="Salad" />
                Salad <input type="checkbox" name="categories" id="Soup" value="Appetizer" />
                Appetizer <input type="checkbox" name="categories" id="Soup" value="Main Course" />
                Main Course <input type="checkbox" name="categories" id="Soup" value="Beverage" />
                Beverage
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={`btn w-full ${
                  loading ? 'bg-gray-400' : 'bg-green-600'
                } text-white text-xl font-semibold`}
                disabled={loading}
              >
                {loading ? 'Creating menu...' : 'Create Menu'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
