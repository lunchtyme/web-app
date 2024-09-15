import React from 'react';
import useLogout from '../utils/useLogout';

const AdminLogout = () => {
  const { logout } = useLogout();
  return (
    <>
      <div className="p-10">
        <button
        onClick={logout}
        className="btn bg-green-600 text-white">Log out</button>
      </div>
    </>
  );
};

export default AdminLogout;
