import React from 'react';
import Table from '../utils/Tables';

const Orders = () => {
  const headers = ['ID', 'Employee Email', 'Lunch', 'Status'];
  const invitations = [];
  return (
    <>
      <section className="bg-gray-50 p-6 rounded">
        <div>
          <h2 className="text-2xl">Orders</h2>
        </div>
        <div>
          <Table headers={headers} data={invitations} emptyMessage="No orders yet!" />
        </div>
      </section>
    </>
  );
};

export default Orders;
