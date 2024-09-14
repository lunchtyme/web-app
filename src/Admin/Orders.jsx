import React from 'react';
import Table from '../utils/Tables';

const Orders = () => {
  const headers = ['ID', 'Employee Email', 'Lunch', 'Status'];
  const invitations = [];
  return (
    <>
      
    <section>
      <Table 
      headers={headers}
      data={invitations}
      emptyMessage="No orders yet!"
      />
    </section>
    
    </>
  );
};

export default Orders;
