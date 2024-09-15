import React, { useState } from 'react';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Menu = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get('esp_lunchtyme_id');

  const categoriesList = [
    'Soup',
    'Salad',
    'Main Course',
    'Dessert',
    'Beverage',
    'Seafood',
    'Vegetarian',
    'Pizza',
    'Gluten-Free',
    'Sandwich',
    'Grill',
    'Steak',
    'Burger',
    'Sides',
    'Breakfast',
    'Brunch',
    'Smoothie',
    'Coffee',
    'Tea',
    'Juice',
    'Snack',
    'Specials',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      categories: checked
        ? [...prevData.categories, value]
        : prevData.categories.filter((category) => category !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await APIHelper.makeSecureAPICall(token).post('food-menu/new', formData);
      if (response.status === 200) {
        alert('Menu item added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          categories: [],
        });
      } else {
        throw new Error('Failed to create menu item');
      }
    } catch (error) {
      setError(error.data || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 mr-14">
      <h2 className="text-2xl p-5">Create Menu</h2>
      <div className="flex gap-24 bg-gray-200 p-8 rounded-lg">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-10">
          <h2 className="text-xl font-semibold text-center mb-4">Add Menu Item</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/** Name Input */}
            <div className="form-control">
              <label className="label font-medium text-md">NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input input-bordered w-full h-12 bg-transparent"
                required
              />
            </div>
            {/** Description Input */}
            <div className="form-control">
              <label className="label font-medium text-md">DESCRIPTION</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your menu"
                className="input input-bordered w-full h-12 bg-transparent"
                required
              />
            </div>
            {/** Price Input */}
            <div className="form-control">
              <label className="label font-medium text-md">PRICE</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="input input-bordered w-full h-12 bg-transparent"
                required
              />
            </div>
            {/** Categories Checkbox */}
            <div className="form-control">
              <label className="label font-medium text-md">CATEGORIES</label>
              <div className="grid grid-cols-2 gap-2">
                {categoriesList.map((category) => (
                  <label key={category} className="flex items-center justify-between">
                    <span className="text-md">{category}</span>
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCheckboxChange}
                      checked={formData.categories.includes(category)}
                      className="checkbox"
                    />
                  </label>
                ))}
              </div>
            </div>
            {/** Submit Button */}
            <button
              type="submit"
              className={`btn w-full h-12 text-white text-lg font-semibold ${
                loading ? 'bg-gray-400' : 'bg-green-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Creating menu...' : 'Create Menu'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Menu;
