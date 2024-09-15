// components/Table.jsx
import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie'

const token = Cookies.get('esp_lunchtyme_id');

const Table = ({ headers, data, emptyMessage }) => {
  return (
    <div className="overflow-x-auto mt-10">
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
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{added_by}</td>
                <td>{item.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
