import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Menu from './Menu';
import Customers from './Customers';
import Orders from './Orders';
import Transactions from './Transactions';
import Overview from './Overview';
import List from './List';
import Settings from './Settings';
import NotFound from '../utils/NotFound';

const AdminDashboard = () => {
  return (
    <section className="bg-gray-200 h-[100vh] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 p-7 overflow-y-auto">
        <h2 className="text-2xl font-semibold p-5">
          Lunch<span className="text-green-600">tyme</span>
        </h2>

        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="lists" element={<List />} />
          <Route path="menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />


          {/* Wildcard route for undefined sub-routes */}
        </Routes>
      </div>
    </section>
  );
};

export default AdminDashboard;
