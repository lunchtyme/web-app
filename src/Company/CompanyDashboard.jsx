import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Invitations from './Invitations';

const CompanyDashboard = () => {
  return (
    <section className="bg-gray-200 h-[100vh] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-7 overflow-y-auto">
        <Routes>
          <Route path="invitations" element={<Invitations />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </section>
  );
};

export default CompanyDashboard;
