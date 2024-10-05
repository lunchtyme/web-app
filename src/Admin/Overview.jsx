import React, { useEffect, useState } from 'react';
import StatCard from '../utils/StatCard';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Overview = () => {
  const [data, setData] = useState({});
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('analytics/admin');
      const fetchedData = response.data.data;
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { number: data.orders || '0', groupName: 'Orders' },
    { number: data.users || '0', groupName: 'Users' },
    { number: data.employees || '0', groupName: 'Employees' },
    { number: data.companies || '0', groupName: 'Companies' },
  ];

  return (
    <section className="p-5">
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>
      <div className="flex gap-10 flex-wrap">
        {stats.map(({ number, groupName }) => (
          <StatCard key={groupName} number={number} groupName={groupName} />
        ))}
      </div>
    </section>
  );
};

export default Overview;
