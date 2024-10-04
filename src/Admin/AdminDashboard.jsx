import React, { useState, useEffect } from 'react';
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
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';
import AdminLogout from './AdminLogout';

const AdminDashboard = () => {
  const color = 'bg-[#3f0c86]';

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false); // Default loading state should be false
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
    <>
      <div
        className="bg-gray-800 w-full fixed top-0 left-0 z-50 text-white
  text-xl text-center flex items-center justify-between py-4 px-5 h-[70px]"
      >
        <img src="/images/lunchtyme-wordmark-white.svg" className="h-9 align-middle" />

        {loading ? (
          <div className="flex justify-center">
            <div className="w-4 h-4 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="dropdown dropdown-bottom dropdown-end h-[3.7rem] w-auto mr-10 mb-2">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 border-0 h-full bg-gray-800 hover:bg-gray-700
          text-white px-5 flex gap-3"
            >
              <p>{data.name}</p>
              <div
                className="bg-green-600 h-10 w-10 rounded-full flex items-center
          justify-center p-2"
              >
                <p className="text-lg">
                  {data.name &&
                    data.name
                      .split(' ')
                      .map((word) => word.charAt(0))
                      .join('')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <section className="overflow-y-hidden bg-gray-200 h-[100vh] flex pt-[4.5rem] sm:pt-[4.5rem] md:pt-[4.5rem]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto px-[2%] border-4 pt-5">
          {/* <h2 className="text-2xl font-semibold p-5">
          Lunch<span className="text-green-600">tyme</span>
        </h2> */}

          <Routes>
            <Route path="overview" element={<Overview />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="lists" element={<List />} />
            <Route path="menu" element={<Menu />} />
            <Route path="logout" element={<AdminLogout />} />
            <Route path="*" element={<NotFound />} />

            {/* Wildcard route for undefined sub-routes */}
          </Routes>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
