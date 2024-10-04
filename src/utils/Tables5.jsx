import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

const Tables5 = ({ headers, data, emptyMessage }) => {
  const token = Cookies.get('esp_lunchtyme_id');

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className=" w-[20rem] md:text-base text-sm px-4 py-2 md:px-6 md:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
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
              <tr key={item._id} className="text-sm md:text-base border-b hover:bg-gray-100">
                <td className="px-4 py-2 md:px-6 md:py-3">{item._id}</td>
                <td className="px-4 py-2 md:px-6 md:py-3">{item.email}</td>
                <td className="flex flex-row px-4 py-2 md:px-6 md:py-3">{`₦${item.amount}`}</td>
                <td className="px-4 py-2 md:px-6 md:py-3">
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </td>
                <td className="px-4 py-2 md:px-6 md:py-3">{item.company_details.name}</td>
                <td className="px-4 py-2 md:px-6 md:py-3">{item.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables5;
