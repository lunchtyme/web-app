import React from 'react';

const placeholderImage = '/images/blank.jpg';

const MenuCard = ({ image, name, description, price, onAddToCart, id }) => {
  const displayImage = image || placeholderImage;

  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        {/* Image Section */}
        <div className="w-2/5">
          <img src={displayImage} alt={name} className="object-cover w-full h-full" />
        </div>

        {/* Text Section */}
        <div className="w-3/5 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
            <p className="mt-4 text-base text-gray-600">{description}</p>
          </div>
          <div className="mt-6">
            <p className="text-2xl font-semibold text-gray-900">&#x20A6;{price}</p>
            <button
              onClick={() => onAddToCart(name, price)}
              className="mt-4 w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-300"
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
