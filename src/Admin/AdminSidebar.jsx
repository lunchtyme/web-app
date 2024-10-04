import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar open/close state

  const sidebarRef = useRef(null);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <section className="relative z-30 ">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="shadow-none border-0 p-5 bg-transparent btn hover:bg-transparent drawer-button lg:hidden"
            >
              <img src="/images/menu-icon.svg" alt="" className="w-8" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul
              className="menu bg-base-200 text-base-content 
            mt-[4.5rem] lg:mt-0 md:mt-[4.5rem] min-h-full w-80 p-4"
            >
              {/* Sidebar content here */}

              <li className="p-2">
                <Link className="lato-bold text-xl flex gap-2 items-center" to="/admin/overview">
                  <img src="/images/HomeIcon.svg" alt="Overview" className="w-6" />
                  Overview
                </Link>
              </li>
              <li className="p-2">
                <Link className="lato-bold text-xl flex gap-2 items-center" to="/admin/orders">
                  <img src="/images/OrderIcon.svg" alt="Orders" className="w-6" />
                  Orders
                </Link>
              </li>
              <li className="p-2">
                <Link className="lato-bold text-xl flex gap-2 items-center" to="/admin/customers">
                  <img src="/images/users.svg" alt="Customers" className="w-6" />
                  Customers
                </Link>
              </li>
              <li className="p-2">
                <Link className="lato-bold text-xl flex gap-2 items-center" to="/admin/lists">
                  <img src="/images/list.svg" alt="Menu Lists" className="w-6" />
                  Meal Lists
                </Link>
              </li>

              <li className="p-2">
                <Link
                  className="lato-bold text-xl flex gap-2 items-center"
                  to="/admin/transactions"
                >
                  <img src="/images/TransactionIcon.svg" alt="Transactions" className="w-6" />
                  Transactions
                </Link>
              </li>
              <li className="p-2">
                <Link
                  className="lato-bold text-xl flex gap-2 items-center"
                  to="/admin/suggestion-list"
                >
                  <img src="/images/add.svg" alt="Transactions" className="w-6" />
                  Meal Suggestion
                </Link>
              </li>

              <li className="border-gray-400 border-t-2 p-5 fixed bottom-32 w-[80%]">
                <Link
                  className="lato-bold text-xl
                flex gap-2 items-center "
                  to="/admin/logout"
                >
                  <img src="/images/logout.svg" alt="Log out" className="w-6" />
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSidebar;
