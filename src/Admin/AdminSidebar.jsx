import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <section className="bg-gray-200 h-[100vh]">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-7">{/* Page content here */}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="Close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <h2 className="text-2xl p-5 font-[600]">
              <span className="text-md">Admin Dashboard</span>
            </h2>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/overview">
                <img src="/images/home.svg" alt="" className="w-6" />
                Overview
              </Link>
            </li>

            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/orders">
                <img src="/images/carry-out.svg" alt="" className="w-6" />
                Orders
              </Link>
            </li>

            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/customers">
                <img src="/images/users.svg" alt="" className="w-6" />
                Customers
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/menu">
                <img src="/images/menu2.svg" alt="" className="w-6" />
                Create Menu
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/lists">
                <img src="/images/list.svg" alt="" className="w-6" />
                Lists
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/transactions">
                <img src="/images/transaction.svg" alt="" className="w-6" />
                Transactions
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/logout">
                <img src="/images/logout.svg" alt="" className="w-6" />
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
