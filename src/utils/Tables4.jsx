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
        foodMenuId: id, // Include the id in the request body
        available: status === 'AVAILABLE' ? true : false, // Send status as true/false
      });

      if (response.status === 200) {
        alert('Status updated successfully!');
        // Optionally, trigger a re-fetch or update the UI state to reflect changes
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Failed to update status:', error.response || error.message);
      alert('Failed to update the status');
    }
  };

  return (
    <div className="mt-10">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-lg">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-10">
                <p className="text-xl text-gray-500">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.name}>
                <td>
                  <img src={item.food_image || blank} className="w-[4rem] h-[4rem] rounded" />
                </td>
                <td>{item.name}</td>
                <td>{`₦ ${item.price}`}</td>
                <td>{moment(item.created_at).format('MMM Do YY')}</td>
                <td>{item.available ? 'AVAILABLE' : 'UNAVAILABLE'}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      ...
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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
