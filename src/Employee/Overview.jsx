import React, { useState } from 'react';
import MenuCard from '../utils/MenuCard';
import CartContainer from '../utils/CartContainer';

const Overview = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const imgUrl = '/images/gbegiri.jpg';
  const imgUrl2 = '/images/grilled-chicken.webp';
  const imgUrl3 = '/images/fish.jpg';
  const imgUrl4 = '/images/burger.jpg';
  const imgUrl5 = '/images/coffee.jpg';

  const handleAddToCart = (name, price) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item) => item.name === name);

    if (existingItemIndex >= 0) {
      // If item exists, increment its quantity
      const updatedItems = cartItems.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedItems);
    } else {
      // Otherwise, add a new item with quantity 1
      setCartItems([...cartItems, { name, price: parseFloat(price), quantity: 1 }]);
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
      <section className=" p-5">
        <div className="w-auto bg-gray-100 p-10 rounded">
          <h2 className="text-2xl p-5">Overview</h2>
          <div className="flex flex-wrap gap-10">
            <MenuCard
              image={imgUrl}
              name={'Gbegiri Soup'}
              description={'Tasty soup to be eaten with any morsel.'}
              price={'10000'}
              onAddToCart={handleAddToCart}
            />
            <MenuCard
              image={imgUrl2}
              name={'Grilled Chicken'}
              description={'Tasty chicken can be eaten with mayo.'}
              price={'8000'}
              onAddToCart={handleAddToCart}
            />
            <MenuCard
              image={imgUrl3}
              name={'Roasted Fish'}
              description={'Roasted and spiced to deliciousness.'}
              price={'18000'}
              onAddToCart={handleAddToCart}
            />
            <MenuCard
              image={imgUrl4}
              name={'Cheese Burger'}
              description={'Filled with sumptuous cheese and steak.'}
              price={'5000'}
              onAddToCart={handleAddToCart}
            />
            <MenuCard
              image={imgUrl5}
              name={'Black Coffee'}
              description={'Hot and fresh, just how you like it.'}
              price={'3000'}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>

      {/* Cart Container */}
      {isCartVisible && (
        <div className="w-auto border-4 border-gray-300 ">
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
