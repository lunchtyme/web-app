// components/Table.jsx
import React from 'react';
import moment from 'moment';

const blank = '/images/blank.jpg';
const Tables4 = ({ headers, data, emptyMessage }) => {
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
                <td>
                  {<img src={item.food_image || blank} className="w-[4rem] h-[4rem] rounded " />}
                </td>
                <td>{item.name}</td>
                <td>{`₦ ${item.price}`}</td>
                <td>{moment(item.created_at).format('MMM Do YY')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables4;
