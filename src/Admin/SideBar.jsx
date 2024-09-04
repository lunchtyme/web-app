import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`w-64 h-screen bg-gray-800 text-white p-4 ${isOpen ? 'block' : 'hidden'}`}>
      <button onClick={onClose} className="text-gray-400 hover:text-white">
        <FaTimes size={24} />
      </button>
      <h1 className="text-2xl font-bold mt-6 mb-4">Dashboard</h1>
      <ul>
        <li className="mb-4"><a href="#" className="hover:underline">Home</a></li>
        <li className="mb-4"><a href="#" className="hover:underline">Projects</a></li>
        <li className="mb-4"><a href="#" className="hover:underline">Tasks</a></li>
        <li className="mb-4"><a href="#" className="hover:underline">Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
