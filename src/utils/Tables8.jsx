import React from 'react';
import axios from 'axios';
import moment from 'moment';
import APIHelper from './APIHelper';
import Cookies from 'js-cookie';

const blank = '/images/blank.jpg';

const Tables8 = ({ headers, data, emptyMessage }) => {
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
                <td>{`${item.employee_details.first_name} ${item.employee_details.last_name}`}</td>
                <td>{`₦ ${item.total_amount}`}</td>
                <td>{moment(item.created_at).format('MMM Do YY')}</td>
                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables8;
