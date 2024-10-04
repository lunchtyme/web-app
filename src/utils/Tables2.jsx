// components/Table.j// components/Table2.jsx
import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

const token = Cookies.get('esp_lunchtyme_id');

const Table2 = ({ headers, data, emptyMessage }) => {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={`header-${index}`} className="text-lg">
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
              <tr key={item.id || `${item.name}-${index}`}>
                <td>{item.name}</td>
                <td>{`₦${item.price}`}</td>
                <td>{item.available ? 'Available' : 'Not Available'}</td>{' '}
                <td>{moment(item.created_at).format('MMM Do YY')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
