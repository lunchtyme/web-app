import React from 'react';
import StatCard from '../utils/StatCard';

const Overview = () => {
  return (
    <>
      <section>
        <div className="p-5">
          <h2 className="text-2xl ">Overview</h2>
          <div className="p-10 flex gap-10">
            <StatCard number="120" groupName="Total Users" />
            <StatCard number="60" groupName="Employees" />
            <StatCard number="40" groupName="Orders" />
            <StatCard number="10" groupName="Admin" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
