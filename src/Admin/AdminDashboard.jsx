import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Menu from './Menu';

const AdminDashboard = () => {
  return (
    <>
    
    <section className="bg-gray-200 h-[100vh] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 p-7 overflow-y-auto">
        <Routes>
          <Route path="menu" element={<Menu />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </section>
 
      
    </>
  );
};

export default AdminDashboard;
