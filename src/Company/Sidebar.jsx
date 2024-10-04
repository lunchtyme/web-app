import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../utils/APIHelper';

const Sidebar = () => {
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
    <section className="bg-gray-200 h-[100%] z-30">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-transparent hover:bg-transparent border-0 shadow-none drawer-button lg:hidden"
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
            mt-[4.5rem] lg:mt-0 md:mt-[4.5rem] h-[100%] w-80 p-4"
          >
            {/* Sidebar content here */}
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/dashboard/overview">
                <img src="/images/HomeIcon.svg" alt="" className="w-6" />
                Overview
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/dashboard/employees">
                <img src="/images/employees.svg" alt="" className="w-6" />
                Employees
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/dashboard/invitations">
                <img src="/images/invite.svg" alt="" className="w-6" />
                Invitations
              </Link>
            </li>
            <li className="p-2">
              <Link className="text-xl flex gap-5 items-center" to="/dashboard/billings">
                <img src="/images/bill.svg" alt="" className="w-6" />
                Billings
              </Link>
            </li>

            <li className="border-gray-400 border-t-2 p-5 fixed bottom-32 w-[80%]">
              <Link
                className="lato-bold text-xl
                flex gap-2 items-center "
                to="/dashboard/logout"
              >
                <img src="/images/logout.svg" alt="Log out" className="w-6" />
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
