import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import Cookies from 'js-cookie';
import APIHelper from './APIHelper';
import moment from 'moment';

const blank = '/images/blank.jpg';

const Tables5 = ({ headers, data, emptyMessage }) => {
  const token = Cookies.get('esp_lunchtyme_id');

  // State to manage the data (including status updates)

  // Function to handle PATCH request and update the status

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
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.email}</td>
                <td>{`₦ ${item.amount}`}</td>
                <td>{moment(item.created_at).format('YYYY-MM-DD')}</td>
                <td>{item.company_details.name}</td> {/* Display the status */}
                <td>{item.type}</td> {/* Display the status */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables5;
