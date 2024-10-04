import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

const token = Cookies.get('esp_lunchtyme_id');

const Table = ({ headers, data, emptyMessage }) => {
  return (
    <div className="overflow-x-auto mt-10">
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
              <td colSpan={headers.length} className="text-center py-10">
                <p className="text-xl text-gray-500">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.name} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item.name}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">₦{item.price}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">{item.added_by}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">{item.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
