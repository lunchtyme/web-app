import React, { useState, useEffect } from 'react';
import APIHelper from './APIHelper';
import Cookies from 'js-cookie';

const CartContainer = ({
  items,
  total,
  onClose,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
}) => {
  const token = Cookies.get('esp_lunchtyme_id');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleCheckout = async () => {
    const checkoutItems = items.map((item) => ({
      food_menu: item.id,
      quantity: item.quantity,
    }));

    const requestBody = {
      foodItems: checkoutItems,
    };

    console.log(requestBody);

    try {
      const response = await APIHelper.makeSecureAPICall(token).post('orders', requestBody);
      setShowSuccessToast(true);
      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.log('Checkout error:', error);
      setError(err.response?.data?.message || 'An error occurred while checking out.');
      setShowToast(true);
    }
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
    <>
      <div className="bg-white shadow-2xl w-[35rem] rounded-lg p-5 h-auto ml-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Shopping Cart</h2>

        {/* Cart Items */}
        <ul className="space-y-4 mb-6">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold text-gray-700">{item.name}</div>
                <div className="flex items-center">
                  <button
                    onClick={() => onDecrementItem(index)}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => onIncrementItem(index)}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg text-gray-700 font-semibold mr-4">
                  &#x20A6;{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="w-[3rem] h-[3rem] bg-gray-300 rounded-full hover:bg-gray-400"
                >
                  <img src="/images/cancel.svg" alt="Remove" className="w-[1.5rem] mx-auto" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Total and Close */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold text-gray-700">Total:</span>
            <span className="text-xl font-bold text-gray-800">&#x20A6;{total}</span>
          </div>
          <div className="flex gap-5">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300 text-lg font-semibold"
            >
              Close Cart
            </button>
            <button
              onClick={handleCheckout}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-300 text-lg font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-error text-white p-5">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success text-white p-5">
            <span>{message || 'Checkout Successfull'}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContainer;
