import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeOrders from './EmployeeOrders';
import Overview from './Overview';

const EmployeeDashboard = () => {
  return (
    <section className="bg-gray-200 h-[100vh] flex">
      {/* Sidebar */}
      <EmployeeSidebar />

      {/* Main content */}
      <div className="flex-1 p-7 overflow-y-auto">
        <h2 className="text-2xl font-semibold">
          Lunch<span className="text-green-600">tyme</span>
        </h2>
        <Routes>
          <Route path="orders" element={<EmployeeOrders />} />
          <Route path="overview" element={<Overview />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </section>
  );
};

export default EmployeeDashboard;
