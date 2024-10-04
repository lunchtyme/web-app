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
      const updatedItems = cartItems.map(
        (item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
        alert('Added to cart'),
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { id, name, price: parseFloat(price), quantity: 1 }]);
    }
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

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex h-[85vh]">
      {/* Main Content */}
      <section>
        <div className=" h-[80vh] w-auto bg-gray-100 rounded flex">
          {/* Button to toggle cart visibility */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between px-2 w-full">
              <h2 className="text-4xl p-5 lato-bold">Menus</h2>
              <button
                onClick={() => setIsCartVisible(!isCartVisible)}
                className="h-14 w-14 px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300 relative"
              >
                {/* {isCartVisible ? 'Hide Cart' : 'Show Cart'} */}
                <img src="/images/cart.svg" alt="" className="w-6 mx-auto my-auto" />
                <div className="absolute top-[-1rem] right-[-1rem] w-6 h-6 bg-gray-800 text-white rounded-full text-xs flex items-center justify-center">
                  {totalItemsInCart}
                </div>
              </button>
            </div>

            <div className="scrollbar-custom p-2 flex flex-wrap gap-10 overflow-y-scroll h-auto">
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
                      className="spinner-border animate-spin inline-block w-8 h-8 border-2 border-t-transparent border-gray-400 rounded-full"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {isCartVisible && (
            <div className=" w-[27rem] sm:w-[28rem] md:w-[30rem]">
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
      </section>

      {/* Cart Container */}
    </div>
  );
};

export default Overview;
