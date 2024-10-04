import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import APIHelper from './APIHelper';
import Cookies from 'js-cookie';

const blank = '/images/blank.jpg';

const Tables9 = ({ headers, data, emptyMessage }) => {
  return (
    <div className="mt-10 overflow-x-auto scrollbar-custom">
      <table className="table-auto min-w-full border-collapse bg-white shadow-lg rounded-lg">
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
            data.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{item.name}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">
                  {item.reason_for_suggestion}
                </td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-800">{`${item.description}`}</td>
                <td className="px-4 py-4 md:px-6 md:py-6 text-gray-600">
                  {moment(item.createdAt).format('MMM Do YY')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables9;
