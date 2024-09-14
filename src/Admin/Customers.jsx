import React, { useEffect, useState } from 'react';
import Tables3 from '../utils/Tables3';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Customers = () => {
  const headers = ['Name', 'Email', 'Date Joined', 'Status', 'Balance'];
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(null);
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await APIHelper.makeSecureAPICall(token).get('users?limit=10');
      const fetchedData = response.data.data.list;
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      setMessage('Error fetching customers: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section>
        <Tables3 headers={headers} data={data} emptyMessage="No customers yet!" />
      </section>
    </>
  );
};

export default Customers;
