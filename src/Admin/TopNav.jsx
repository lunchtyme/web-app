import React from 'react';
import { FaBars } from 'react-icons/fa';

const TopNav = ({ onToggleSidebar }) => {
  return (
    <div className="bg-gray-900 text-white p-4 shadow-md flex items-center">
      <button onClick={onToggleSidebar} className="mr-4 text-gray-400 hover:text-white">
        <FaBars size={24} />
      </button>
      <h1 className="text-xl font-bold">launchtyme Dashboard</h1>
    </div>
  );
};

export default TopNav;
