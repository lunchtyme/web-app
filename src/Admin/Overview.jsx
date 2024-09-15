import React from 'react';
import StatCard from '../utils/StatCard';

const Overview = () => {
  const stats = [
    { number: '120', groupName: 'Total Users' },
    { number: '60', groupName: 'Employees' },
    { number: '40', groupName: 'Orders' },
    { number: '10', groupName: 'Admin' },
  ];

  return (
    <section className="p-5">
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>
      <div className="flex gap-10">
        {stats.map(({ number, groupName }) => (
          <StatCard key={groupName} number={number} groupName={groupName} />
        ))}
      </div>
    </section>
  );
};

export default Overview;
