import React from 'react';
import Table from '../utils/Tables';

const Transactions = () => {
  const headers = ['ID', 'Name', 'Email','Date'];
  const invitations = [];
  return (
    <>
      <section className='p-6 bg-gray-50 rounded'>
        <div>
          <h2 className='text-2xl'>Transactions</h2>
        </div>
        <Table
        headers={headers} 
        data={invitations} 
        emptyMessage="No transactions made!" />
      </section>
    </>
  );
};

export default Transactions;
