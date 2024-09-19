import React, { useState, useEffect } from 'react';
import MenuCard from '../utils/MenuCard';
import CartContainer from '../utils/CartContainer';
import axios from 'axios';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Overview = () => {
  const [menuItems, setMenuItems] = useState([]); // State to store menu items from the API
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
      // If the item already exists in the cart, increment its quantity
      const updatedItems = cartItems.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedItems);
    } else {
      // Otherwise, add a new item to the cart
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

  return (
    <div className="flex">
      {/* Main Content */}
      <section className="p-5">
        <div className="w-auto bg-gray-100 p-10 rounded">
          <h2 className="text-2xl p-5">Overview</h2>
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
              <p>Loading menu items...</p>
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
