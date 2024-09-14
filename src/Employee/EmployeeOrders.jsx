import React from 'react';
import Tables2 from '../utils/Tables2';

const EmployeeOrders = () => {
  const headers = ['Name', 'Title', 'Date', 'Status'];
  const data = [['NAME'], ['Hideout'], ['Hideout'], ['Hideout']];
  return (
    <>
      <section className="p-5">
        <div className="p-5">
          <h2 className="text-2xl">Orders</h2>
        </div>
        <div>
          <Tables2 headers={headers} data={data} emptyMessage={'No orders yet!'} />
        </div>
      </section>
    </>
  );
};

export default EmployeeOrders;
