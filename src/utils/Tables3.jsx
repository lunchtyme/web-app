import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

const token = Cookies.get('esp_lunchtyme_id');

const Tables3 = ({ headers, data, emptyMessage }) => {
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="table-auto min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
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
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item.name}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item.email}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">
                  {moment(item.created_at).format('MMM Do YY')}
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.account_state === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.account_state}
                  </span>
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">
                  ₦{item.account_details.spend_balance}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables3;
