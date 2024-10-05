import React, { useState } from 'react';
import moment from 'moment';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const blank = '/images/blank.jpg';

const Tables6 = ({ headers, data, emptyMessage }) => {
  const [tableData, setTableData] = useState(data);
  const token = Cookies.get('esp_lunchtyme_id');

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).patch(`orders/update-status`, {
        orderId: itemId,
        newStatus: newStatus,
      });

      setTableData((prevData) =>
        prevData.map((item) => (item._id === itemId ? { ...item, status: newStatus } : item)),
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="table-auto min-w-full bg-white shadow-md rounded-lg border border-gray-200">
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
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-10">
                <p className="text-xl text-gray-500">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            tableData.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item._id}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item.status}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{`₦${item.total_amount}`}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">
                  {item.employee_details
                    ? `${item.employee_details.first_name} ${item.employee_details.last_name}`
                    : 'No Employee Info'}
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 bg-gray-200 hover:bg-gray-300"
                    >
                      ...
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white rounded-lg border border-gray-200 shadow-md z-[1] w-52 p-2"
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
