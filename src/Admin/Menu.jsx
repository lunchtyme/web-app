import React, { useState, useEffect } from 'react';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Menu = () => {
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    food_image: null,
    categories: [],
    health_benefits: [],
    allergens: [],
    suitable_for_conditions: [],
    suitable_for_diet: [],
  });

  const [currentStep, setCurrentStep] = useState(1); // Step tracking
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(''); // To show validation errors
  const token = Cookies.get('esp_lunchtyme_id');

  const handleHealthChange = (e) => {
    const value = e.target.value;
    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      health_benefits: allergyList,
    }));
  };
  const handleAllergensChange = (e) => {
    const value = e.target.value;
    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      allergens: allergyList,
    }));
  };
  const handleConditionsChange = (e) => {
    const value = e.target.value;
    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      suitable_for_conditions: allergyList,
    }));
  };
  const handleDietsChange = (e) => {
    const value = e.target.value;
    const allergyList = value.split(',').map((item) => item.trim());
    // .filter((item) => item);
    setFormData((prevData) => ({
      ...prevData,
      suitable_for_diet: allergyList,
    }));
  };

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
        setFormData({ ...formData, [name]: file });
        setImagePreview(URL.createObjectURL(file));
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
        ? [...prevData.categories, value]
        : prevData.categories.filter((category) => category !== value),
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
    formDataToSend.append('food_image', formData.food_image);
    formDataToSend.append('allergens', formData.allergens);
    formDataToSend.append('health_benefits', formData.health_benefits);
    formDataToSend.append('suitable_for_conditions', formData.suitable_for_conditions);
    formDataToSend.append('suitable_for_diet', formData.suitable_for_diet);
    formData.categories.forEach((category) => {
      formDataToSend.append('categories[]', category);
    });

    try {
      const response = await APIHelper.makeSecureAPICall(token).post(
        'food-menu/new',
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      if (response.status === 200) {
        setShowSuccessToast(true);
        setFormData({
          name: '',
          description: '',
          price: '',
          food_image: null,
          categories: [],
        });
        setImagePreview(null);
        setCurrentStep(1); // Reset to first step after submission
      } else {
        throw new Error('Failed to create menu item');
      }
    } catch (error) {
      setShowToast(true);
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Next step validation logic
  const nextStep = () => {
    // Validate that the first step is complete
    if (!formData.name || !formData.description || !formData.price) {
      setValidationError('Please complete all fields in Step 1');
    } else {
      setValidationError(''); // Clear any previous validation errors
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  return (
    <section className="w-full ">
      <h2 className="text-2xl p-5 lato-bold">Create Menu</h2>
      <div className="flex gap-24 bg-gray-200 p-8 rounded-lg w-[100%] ">
        <div className="w-full bg-white shadow-lg rounded-lg p-10">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Validation error for Step 1 */}
          {validationError && <p className="text-red-500 text-sm mb-4">{validationError}</p>}

          {/* Step 1: Name, Description, and Price */}
          {currentStep === 1 && (
            <form className="space-y-6 w-[100%]">
              <div className="form-control">
                <label className="label font-medium text-md lato-regular">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="focus:ring-0 input input-bordered w-full h-12 bg-transparent"
                  required
                />
              </div>

              <div className="form-control ">
                <label className="label font-medium text-md lato-regular">DESCRIPTION</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your menu"
                  className="focus:ring-0 input input-bordered w-full h-12 bg-transparent"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-md lato-regular">PRICE</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="focus:ring-0 input input-bordered w-full h-12 bg-transparent"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[1rem]">HEALTH BENEFITS</span>
                </label>
                <input
                  type="text"
                  name="health_benefits"
                  value={formData.health_benefits.join(', ')} // Join array for display
                  onChange={handleHealthChange}
                  placeholder="Enter benefits, separated by commas"
                  className="input input-bordered focus:outline-none"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[1rem]">ALLERGENS</span>
                </label>
                <input
                  type="text"
                  name="allergens"
                  value={formData.allergens.join(', ')} // Join array for display
                  onChange={handleAllergensChange}
                  placeholder="Enter allergies, separated by commas"
                  className="input input-bordered focus:outline-none"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[1rem]">SUITABLE CONDITIONS</span>
                </label>
                <input
                  type="text"
                  name="suitable_for_conditions"
                  value={formData.suitable_for_conditions.join(', ')} // Join array for display
                  onChange={handleConditionsChange}
                  placeholder="Enter conditions, separated by commas"
                  className="input input-bordered focus:outline-none"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[1rem]">SUITABLE DIETS</span>
                </label>
                <input
                  type="text"
                  name="suitable_for_diet"
                  value={formData.suitable_for_diet.join(', ')} // Join array for display
                  onChange={handleDietsChange}
                  placeholder="Enter suitable diets, separated by commas"
                  className="input input-bordered focus:outline-none"
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn w-[10rem] h-12 text-white text-lg font-semibold bg-gray-800"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Categories and Image Upload */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label font-medium text-xl lato-regular">CATEGORIES</label>
                <div className="grid grid-cols-2 gap-5">
                  {categoriesList.map((category) => (
                    <label key={category} className="flex items-center">
                      <div className="w-[80%] flex justify-between">
                        <span className="text-md mr-10">{category}</span>
                        <input
                          type="checkbox"
                          value={category}
                          onChange={handleCheckboxChange}
                          checked={formData.categories.includes(category)}
                          className="checkbox"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-control pt-5">
                <h2 className="text-xl lato-bold p-2">Upload image for menu</h2>
                <input
                  type="file"
                  name="food_image"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn w-32 h-12 text-white text-lg font-semibold bg-gray-800"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className={`btn w-32 h-12 text-white text-lg font-semibold ${
                    loading ? 'bg-gray-400' : 'bg-green-500'
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Creating menu...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {showToast && (
        <div className="toast toast-end toast-top mr-10">
          <div className="alert alert-error text-white p-5">
            <span>{error.message}</span>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="toast toast-end toast-top mr-10 z-50">
          <div className="alert alert-success text-white p-5">
            <span>Menu added successfully.</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
