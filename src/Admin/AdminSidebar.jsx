import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../utils/APIHelper';
import AdminLogout from './AdminLogout';

const AdminSidebar = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('auth/me');
      const fetchedData = response.data.data;
      setData(fetchedData);
    } catch (error) {
      setError(error.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <ul className="menu bg-gray-100 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              <details className="collapse bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <summary className="collapse-title text-xl font-medium">Profile</summary>
                <div className="collapse-content flex flex-col gap-3">
                  <p className="text-xl font-semibold">{data.account_type}</p>
                  <div className="flex items-center gap-5">
                    <p className="text-md">{data.email}</p>
                    <div className="">
                      <AdminLogout />
                    </div>
                  </div>
                </div>
              </details>
            )}

            {error && <p>{error}</p>}
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
                Menu Lists
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/admin/transactions">
                <img src="/images/transaction.svg" alt="" className="w-6" />
                Transactions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
