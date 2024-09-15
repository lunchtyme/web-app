import React, { useEffect, useState } from 'react';
import Tables3 from '../utils/Tables3';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Customers = () => {
  const headers = ['Name', 'Email', 'Date Joined', 'Status', 'Balance'];
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('users?limit=10');
      setData(response.data.data.list);
    } catch (error) {
      setMessage('Error fetching customers.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="p-6 bg-gray-50 rounded">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : message ? (
        <p className="text-red-500 text-center">{message}</p>
      ) : (
        <div>
          <div>
            <h2 className="text-xl">Customers</h2>
          </div>
          <Tables3 headers={headers} data={data} emptyMessage="No customers yet!" />
        </div>
      )}
    </section>
  );
};

export default Customers;
