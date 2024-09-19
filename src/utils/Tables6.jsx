import React, { useState } from 'react';
import moment from 'moment';
import APIHelper from '../utils/APIHelper'; // Ensure the API helper is imported correctly
import Cookies from 'js-cookie'; // To get the token

const blank = '/images/blank.jpg';

const Tables6 = ({ headers, data, emptyMessage }) => {
  const [tableData, setTableData] = useState(data); // Local state to update table data
  const token = Cookies.get('esp_lunchtyme_id'); // Get token from cookies

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).patch(`orders/update-status`, {
        orderId: itemId, // Include the orderId in the request
        newStatus: newStatus, // Pass the new status selected from the dropdown
      });
      console.log('Response:', response.data);

      // Update the status in the local state
      setTableData((prevData) =>
        prevData.map((item) => (item._id === itemId ? { ...item, status: newStatus } : item)),
      );
    } catch (error) {
      console.error('Error updating status:', error);
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
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-10">
                <p className="text-xl text-gray-500">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            tableData.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{moment(item.created_at).format('YYYY-MM-DD')}</td> {/* Format date */}
                <td>{item.status}</td>
                <td>{`₦ ${item.total_amount}`}</td>
                <td>
                  {item.employee_details
                    ? `${item.employee_details.first_name} ${item.employee_details.last_name}`
                    : 'No Employee Info'}
                </td>
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
                        <a onClick={() => handleStatusChange(item._id, 'PENDING')}>PENDING</a>
                      </li>
                      <li>
                        <a onClick={() => handleStatusChange(item._id, 'DECLINED')}>DECLINED</a>
                      </li>
                      <li>
                        <a onClick={() => handleStatusChange(item._id, 'CONFIRMED')}>CONFIRMED</a>
                      </li>
                      <li>
                        <a onClick={() => handleStatusChange(item._id, 'CANCELLED')}>CANCELLED</a>
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

export default Tables6;
