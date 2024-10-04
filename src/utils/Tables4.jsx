import React from 'react';
import axios from 'axios';
import moment from 'moment';
import APIHelper from './APIHelper';
import Cookies from 'js-cookie';

const blank = '/images/blank.jpg';

const Tables4 = ({ headers, data, emptyMessage }) => {
  const token = Cookies.get('esp_lunchtyme_id');

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
              <tr key={item.name} className="border-t hover:bg-gray-50">
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
    </div>
  );
};

export default Tables4;
