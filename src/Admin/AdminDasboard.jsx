import React from 'react';

const AdminDashboard = () => {
  return (
    <>
      <section className="bg-gray-200 h-[100vh]">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content p-5 pl-8 flex align-middle">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button bg-gray-200 border-0 shadow-none">
              <img className="w-[2rem]" src="images/menu.svg" alt="" />
            </label>

            <div className="align-middle pl-10 pt-2">
              <h2 className="text-2xl font-semibold">
                Launch<span className="text-green-600">tyme</span>
              </h2>
            </div>

            {/* Main Dashboard Content */}
            <div className="p-5 pt-10 border-2 w-full mt-10">
              <div className="flex gap-10">

                <div className="card bg-base-200  w-96 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title text-2xl">Invitations</h2>
                    <p className="text-xl">19 employees</p>
                  </div>
                </div>

                <div className="card bg-base-200 w-96 shadow-md cursor-pointer">
                  <div className="card-body">
                    <h2 className="card-title text-2xl">Orders</h2>
                    <p className="text-xl">192</p>
                  </div>
                </div>
                
                <div className="card bg-base-200  w-96 shadow-md cursor-pointer">
                  <div className="card-body">
                    <h2 className="card-title text-2xl">Transactions</h2>
                    <p className="text-xl">19</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <div className="flex p-1">
                <h2 className="text-2xl p-5 font-[600]">
                  <span className="text-md">Admin</span>
                </h2>
                {/* Sidebar items */}
              </div>
              <li className="p-2">
                <a className="text-xl">Home</a>
              </li>
              <li className="p-2">
                <a className="text-xl">Orders</a>
              </li>
              <li className="p-2">
                <a className="text-xl">Customers</a>
              </li>
              <li className="p-2">
                <a className="text-xl">Food Menu</a>
              </li>
              <li className="p-2">
                <a className="text-xl">Transactions</a>
              </li>
              <li className="p-2">
                <a className="text-xl">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
