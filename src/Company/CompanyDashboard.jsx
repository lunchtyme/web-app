import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Invitations from './Invitations';
import Overview from './Overview';
import Billings from './Billings';
import Employees from './Employees';
import CompanyLogout from './CompanyLogout';

const CompanyDashboard = () => {
  return (
    <section className="bg-gray-200 h-[100vh] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-7 overflow-y-auto">
        <h2 className="text-2xl font-semibold">
          Lunch<span className="text-green-600">tyme</span>
        </h2>
        <Routes>
          <Route path="invitations" element={<Invitations />} />
          <Route path="overview" element={<Overview />} />
          <Route path="billings" element={<Billings />} />
          <Route path="employees" element={<Employees />} />
          <Route path="logout" element={<CompanyLogout />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </section>
  );
};

export default CompanyDashboard;
