import React, { useState } from 'react';
import Tables4 from '../utils/Tables4';

const EmployeeOrders = () => {
  const headers = ['Name', 'Title', 'Date', 'Status'];
  const [data, setData] = useState('');
  return (
    <>
      <section className="p-5">
        <div className=" bg-gray-50 p-5 mt-10">
          <div className="p-5">
            <h2 className="text-2xl">My orders</h2>
          </div>
          <div>
            <Tables4 headers={headers} data={headers} emptyMessage={'No orders yet!'} />
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeOrders;
