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

  const token = Cookies.get('esp_lunchtyme_id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return { ...prevFormData, categories: [...prevFormData.categories, value] };
      }

      return {
        ...prevFormData,
        categories: prevFormData.categories.filter((category) => category !== value),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Post request
      const response = await APIHelper.makeSecureAPICall(token).post('food-menu/new', formData);
      console.log(response.data);
      if (response.status === 200) {
        // Handle successful response
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
    <>
      <section className="mt-5 mr-14">
        <h2 className="text-2xl p-5">Create Menu</h2>
        <div className="h-auto flex gap-24 items-center bg-gray-200">
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
              <div className="form-control flex flex-col gap-5">
                <label className="label">
                  <span className="label-text text-lg font-[500]">CATEGORIES</span>
                </label>
                <div className="flex justify-between">
                  <label htmlFor="Soup" className="text-xl">
                    Soup
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="Soup"
                    value="Soup"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="Salad" className="text-xl">
                    Salad
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="Salad"
                    value="Salad"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="main-course" className="text-xl">
                    Main Course
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="main-course"
                    value="Main Course"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="dessert" className="text-xl">
                    Dessert
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="dessert"
                    value="Dessert"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="beverage" className="text-xl">
                    Beverage
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="beverage"
                    value="Beverage"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                {/**Main */}

                <div className="flex justify-between">
                  <label htmlFor="seafood" className="text-xl">
                    Seafood
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="seafood"
                    value="Seafood"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="vegetarian" className="text-xl">
                    Vegetarian
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="vegetarian"
                    value="Vegetarian"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="pizza" className="text-xl">
                    Pizza
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="pizza"
                    value="Pizza"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="gluten-free" className="text-xl">
                    Gluten-Free
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="gluten-free"
                    value="Gluten-Free"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="sandwich" className="text-xl">
                    Sandwich
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="sandwich"
                    value="Sandwich"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="grill" className="text-xl">
                    Grill
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="grill"
                    value="Grill"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="steak" className="text-xl">
                    Steak
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="steak"
                    value="Steak"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="burger" className="text-xl">
                    Burger
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="burger"
                    value="Burger"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="sides" className="text-xl">
                    Sides
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="sides"
                    value="Sides"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="breakfast" className="text-xl">
                    Breakfast
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="breakfast"
                    value="Breakfast"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="brunch" className="text-xl">
                    Brunch
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="brunch"
                    value="Brunch"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="smoothie" className="text-xl">
                    Smoothie
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="smoothie"
                    value="Smoothie"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="coffee" className="text-xl">
                    Coffee
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="coffee"
                    value="Coffee"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="tea" className="text-xl">
                    Tea
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="tea"
                    value="Tea"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="juice" className="text-xl">
                    Juice
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="juice"
                    value="Juice"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="snack" className="text-xl">
                    Snack
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="snack"
                    value="Snack"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="specials" className="text-xl">
                    Specials
                  </label>
                  <input
                    type="checkbox"
                    name="categories"
                    id="specials"
                    value="Specials"
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="p-10">
                <button
                  type="submit"
                  className={`btn w-full ${
                    loading ? 'bg-gray-400' : 'bg-green-600'
                  } text-white text-xl font-semibold`}
                  disabled={loading}
                >
                  {loading ? 'Creating menu...' : 'Create Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
