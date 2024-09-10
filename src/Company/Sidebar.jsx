import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <section className="bg-gray-200 h-[100vh]">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-7">
          {/* Page content here */}
          <h2 className="text-2xl font-semibold">   
            Lunch<span className="text-green-600">tyme</span>
          </h2>

          <div className="p-5 pt-10 border-2 w-full mt-10">
            <div className="flex gap-10">
              {/* Content */}
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="Close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <h2 className="text-2xl p-5 font-[600]">
              <span className="text-md">Company Dashboard</span>
            </h2>
            <li className="p-2">
              <Link className="text-xl" to="/dashboard">Overview</Link>
            </li>

            <li className="p-2">
              <Link className="text-xl" to="/dashboard/invitations">Employees</Link>
            </li>

            <li className="p-2">
              <Link className="text-xl" to="/dashboard/invitations">Invitations</Link>
            </li>
            <li className="p-2">
              <Link className="text-xl" to="/dashboard/invitations">Billings</Link>
            </li>
            <li className="p-2">
              <Link className="text-xl" to="/dashboard/invitations">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
