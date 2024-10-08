import React from 'react';
import useLogout from '../utils/useLogout';

const CompanyLogout = () => {
  const { logout } = useLogout();
  return (
    <>
      <div className="">
        <button onClick={logout} className="btn bg-green-500 text-white">
          Log out
        </button>
      </div>
    </>
  );
};

export default CompanyLogout;
