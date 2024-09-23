// components/Table.jsx
import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

const token = Cookies.get('esp_lunchtyme_id');

const Tables3 = ({ headers, data, emptyMessage }) => {
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
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{moment(item.created_at).format('MMM Do YY')}</td>
                <td>{item.account_state}</td>
                <td>{item.account_details.spend_balance}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables3;
