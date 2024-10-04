import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import APIHelper from './APIHelper';
import Cookies from 'js-cookie';

const blank = '/images/blank.jpg';

const Tables4 = ({ headers, data, emptyMessage }) => {
  const token = Cookies.get('esp_lunchtyme_id');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).patch(`food-menu`, {
        foodMenuId: id,
        available: status === 'AVAILABLE' ? true : false,
      });

      if (response.status === 200) {
        alert('Status updated successfully!');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Failed to update status:', error.response || error.message);
      alert('Failed to update the status');
    }
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="table-auto min-w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left text-gray-700 text-sm md:text-base px-4 py-2 md:px-6 md:py-4 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-10 md:text-base text-sm px-4">
                <p className="text-xl text-gray-500">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.name}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="px-4 py-4 md:px-6 md:py-6">
                  <img
                    src={item.food_image || blank}
                    className="w-16 h-16 md:w-20 md:h-20 rounded shadow-md"
                    alt={item.name}
                  />
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item.name}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{`₦${item.price}`}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">
                  {moment(item.created_at).format('MMM Do YY')}
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.available ? 'AVAILABLE' : 'UNAVAILABLE'}
                  </span>
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6">
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost text-lg">
                      ...
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white border rounded-lg shadow-lg w-52 p-2"
                    >
                      <li>
                        <a onClick={() => handleStatusChange(item._id, 'AVAILABLE')}>AVAILABLE</a>
                      </li>
                      <li>
                        <a onClick={() => handleStatusChange(item._id, 'UNAVAILABLE')}>
                          UNAVAILABLE
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && selectedItem && (
        <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="scrollbar-custom bg-white rounded-lg p-6 w-full max-w-[30rem] h-[90%] overflow-auto shadow-lg">
            <div className="relative">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{selectedItem.name}</h2>

              <img
                src={selectedItem.food_image || blank}
                className="object-cover rounded-lg w-full h-60"
                alt={selectedItem.name}
              />

              <div className="mt-6 leading-relaxed text-gray-700">
                <p className="text-lg font-semibold">
                  <strong>Price:</strong> ₦{selectedItem.price}
                </p>
                <p className="text-lg font-semibold">
                  <strong>Created At:</strong> {moment(selectedItem.created_at).format('MMM Do YY')}
                </p>
                <p className="text-md font-semibold">
                  <strong>Status:</strong> {selectedItem.available ? 'AVAILABLE' : 'UNAVAILABLE'}
                </p>
                <p className="text-xl font-semibold mt-4">
                  <strong>Health benefits:</strong>
                </p>
                <ol className="list-disc pl-5">
                  {selectedItem.health_benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ol>

                <p className="text-xl font-semibold mt-4">
                  <strong>Allergens:</strong>
                </p>
                <ol className="list-disc pl-5">
                  {selectedItem.allergens.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ol>

                <p className="text-xl font-semibold mt-4">
                  <strong>Conditions suitable for:</strong>
                </p>
                <ol className="list-disc pl-5">
                  {selectedItem.suitable_for_conditions.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ol>

                <p className="text-xl font-semibold mt-4">
                  <strong>Diet suitable for:</strong>
                </p>
                <ol className="list-disc pl-5">
                  {selectedItem.suitable_for_diet.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ol>
              </div>

              <button
                onClick={closeModal}
                className="absolute top-0 right-0 w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400 flex items-center justify-center"
              >
                <img src="/images/cancel.svg" alt="Close" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables4;
