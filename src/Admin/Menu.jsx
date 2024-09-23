import React, { useState } from 'react';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Menu = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    food_image: null,
    categories: [],
  });

  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
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
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file && file.type.startsWith('image/')) {
        // Validate that the file is an image
        setFormData({ ...formData, [name]: file });
        setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
      } else {
        setError('Please upload a valid image file');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      categories: checked
        ? [...prevData.categories, value] // Add category if checked
        : prevData.categories.filter((category) => category !== value), // Remove category if unchecked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('food_image', formData.food_image); // Append the file
    formData.categories.forEach((category) => {
      formDataToSend.append('categories[]', category); // Send categories as an array
    });

    try {
      const response = await APIHelper.makeSecureAPICall(token).post(
        'food-menu/new',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        alert('Menu item added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          food_image: null,
          categories: [],
        });
        setImagePreview(null); // Clear the image preview
      } else {
        throw new Error('Failed to create menu item');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
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

            <div className="form-control pt-5">
              <h2 className="text-lg">Upload image for menu</h2>
              <input
                type="file"
                name="food_image"
                accept="image/*"
                onChange={handleChange}
                className="file-input file-input-bordered file-input-success w-full max-w-xs"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
                </div>
              )}
            </div>

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
