import React from 'react';
import Table from '../utils/Tables';

const Transactions = () => {
  const headers = ['ID', 'Name', 'Email','Date'];
  const invitations = [];
  return (
    <>
      <section>
        <Table
        headers={headers} 
        data={invitations} 
        emptyMessage="No transactions made!" />
      </section>
    </>
  );
};

export default Transactions;
