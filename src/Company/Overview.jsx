import React, { useEffect, useState } from 'react';
import StatCard from '../utils/StatCard';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Overview = () => {
  const [data, setData] = useState({});
  const token = Cookies.get('esp_lunchtyme_id');

  const formatBalance = (balance) => {
    return new Intl.NumberFormat().format(balance);
  };

  const fetchData = async () => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('analytics/company');
      const fetchedData = response.data.data;
      setData(fetchedData);
      console.log(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { number: data.orders || '0', groupName: 'Orders' },
    { number: `₦ ${formatBalance(Math.round(data.balance))}` || '0', groupName: 'Balance' },
    { number: data.employees || '0', groupName: 'Employees' },
    { number: data.amount_spent || '0', groupName: 'Amount spent till date' },
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
