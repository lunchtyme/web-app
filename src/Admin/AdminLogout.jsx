import React from 'react';
import useLogout from '../utils/useLogout';

const AdminLogout = () => {
  const { logout } = useLogout();
  return (
    <>
      <div className="p-5">
        <button
          onClick={logout}
          className=" lato-bold btn text-xl  bg-gray-500 w-[14rem] text-white text-center"
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default AdminLogout;
