import React from 'react';

const StatCard = ({ number, groupName }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 w-[20rem]">
      {/* Number Section */}
      <div className="text-3xl font-bold text-gray-800">{number}</div>

      {/* Group Name Section */}
      <div className="mt-2 text-base font-medium text-gray-600">{groupName}</div>
    </div>
  );
};

export default StatCard;
