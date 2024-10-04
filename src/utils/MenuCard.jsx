import React from 'react';

const placeholderImage = '/images/blank.jpg';

const MenuCard = ({ image, name, description, price, onAddToCart, id }) => {
  const displayImage = image || placeholderImage;

  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-2/5">
          <img src={displayImage} alt={name} className="object-cover w-full h-48 sm:h-full" />
        </div>

        {/* Text Section */}
        <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col justify-between lato-bold">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{name}</h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">{description}</p>
          </div>
          <div className="mt-4 sm:mt-6">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">&#x20A6;{price}</p>
            <button
              onClick={() => onAddToCart(name, price)}
              className="mt-4 w-[80%] px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
