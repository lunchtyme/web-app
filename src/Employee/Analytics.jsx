import React, { useEffect, useState } from 'react';
import StatCard from '../utils/StatCard';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Analytics = () => {
  const [data, setData] = useState({});
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('analytics/employee');
      const fetchedData = response.data.data;
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { number: data.orders || '0', groupName: 'Orders' },
    { number: data.employees || '₦ 0', groupName: 'Balance' },
  ];

  return (
    <section className="p-5">
      <h2 className="text-2xl font-semibold mb-6 p-5">Analytics</h2>
      <div className="flex gap-10 p-5">
        {stats.map(({ number, groupName }) => (
          <StatCard key={groupName} number={number} groupName={groupName} />
        ))}
      </div>
    </section>
  );
};

export default Analytics;
