import React, { useState, useEffect } from 'react';
import MenuCard from '../utils/MenuCard';
import CartContainer from '../utils/CartContainer';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Overview = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const token = Cookies.get('esp_lunchtyme_id');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await APIHelper.makeSecureAPICall(token).get('food-menu?limit=10');
        const fetchedData = response.data.data.list;
        setMenuItems(fetchedData);
      } catch (error) {
        console.log('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (id, name, price) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === id);

    if (existingItemIndex >= 0) {
      const updatedItems = cartItems.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { id, name, price: parseFloat(price), quantity: 1 }]);
    }

    setIsCartVisible(true);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  const handleIncrementItem = (index) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCartItems(updatedItems);
  };

  const handleDecrementItem = (index) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
    );
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <section className="p-5">
        <div className="w-auto bg-gray-100 p-10 rounded">
          <h2 className="text-2xl p-5">Overview</h2>
          {/* Button to toggle cart visibility */}
          <div className="py-5">
            <button
              onClick={() => setIsCartVisible(!isCartVisible)}
              className="mt-5 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-300"
            >
              {isCartVisible ? 'Hide Cart' : 'Show Cart'}
            </button>
          </div>
          <div className="flex flex-wrap gap-10">
            {menuItems.length > 0 ? (
              menuItems.map((menuItem, index) => (
                <MenuCard
                  key={index}
                  image={menuItem.food_image}
                  name={menuItem.name}
                  description={menuItem.description}
                  price={menuItem.price}
                  onAddToCart={() => handleAddToCart(menuItem._id, menuItem.name, menuItem.price)}
                />
              ))
            ) : (
              <>
                <p>Loading menu items...</p>
                <div className="flex justify-center items-center">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-gray-400 rounded-full"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Cart Container */}
      {isCartVisible && (
        <div className="w-auto border-4 border-gray-300">
          <CartContainer
            items={cartItems}
            total={total}
            onClose={handleCloseCart}
            onRemoveItem={handleRemoveItem}
            onIncrementItem={handleIncrementItem}
            onDecrementItem={handleDecrementItem}
          />
        </div>
      )}
    </div>
  );
};

export default Overview;
