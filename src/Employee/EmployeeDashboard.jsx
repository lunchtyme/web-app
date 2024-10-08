import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeOrders from './EmployeeOrders';
import Overview from './Overview';
import Analytics from './Analytics';
import NotFound from '../utils/NotFound';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';
import Logout from './Logout';
import Suggestions from './Suggestions';

const EmployeeDashboard = () => {
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
        className="bg-gray-800 w-full fixed top-0 left-0 z-50 text-white text-xl
      text-center flex items-center justify-between py-4 px-5 h-[70px]"
      >
        <img src="/images/lunchtyme-wordmark-white.svg" className="h-9 align-middle" />

        {loading ? (
          <div className="flex justify-center">
            <div className="w-4 h-4 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          // Profile
          <div className="hidden sm:block dropdown dropdown-bottom dropdown-end h-[3.7rem] w-auto mr-10 mb-2">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 border-0 h-full bg-gray-800 hover:bg-gray-700
          text-white px-5 flex gap-3"
            >
              <p>{data.name}</p>
              <div className="bg-green-600 h-10 w-10 rounded-full flex items-center justify-center p-2">
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
        {/* Header */}

        {/* Sidebar */}
        <EmployeeSidebar />

        {/* Main content */}
        <div className="flex-1 px-[2%] border-4 pt-5">
          <Routes>
            <Route path="orders" element={<EmployeeOrders />} />
            <Route path="overview" element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
            <Route path="logout" element={<Logout />} />
            <Route path="suggestions" element={<Suggestions />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </section>
    </>
  );
};

export default EmployeeDashboard;
