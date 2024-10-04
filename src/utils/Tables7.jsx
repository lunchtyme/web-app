import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

const token = Cookies.get('esp_lunchtyme_id');

const Tables7 = ({ headers, data, emptyMessage }) => {
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
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
            data.map((item, index) => (
              <tr
                key={item.id || `${item.name}-${index}`}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } border-b`}
              >
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {item.company_details.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {item.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {moment(item.created_at).format('MMM Do YY')}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {item.type}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {item.status}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {`₦ ${item.amount}`}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables7;
