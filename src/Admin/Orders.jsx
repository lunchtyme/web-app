import React, { useEffect, useState } from 'react';
import Tables6 from '../utils/Tables6';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Orders = () => {
  const headers = ['ID', 'Date', 'Status', 'Amount', 'Customer'];
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Use false instead of null
  const [error, setError] = useState(null);

  const token = Cookies.get('esp_lunchtyme_id');

  const fetchTable = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('orders');
      const fetchedData = response.data.data.list;
      console.log(fetchedData);
      setData(fetchedData); // Correctly set the fetched data
    } catch (error) {
      setError(`Error: ${error.message}`); // Set error message correctly
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  return (
    <section className="bg-gray-50 p-6 rounded h-auto">
      <div>
        <h2 className="text-2xl">Orders</h2>
      </div>
      <div className="h-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Tables6 headers={headers} data={data} emptyMessage="No orders yet!" />
        )}
      </div>
    </section>
  );
};

export default Orders;
