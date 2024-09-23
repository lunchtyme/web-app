import React, { useState, useEffect } from 'react';
import Tables8 from '../utils/Tables8';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const EmployeeOrders = () => {
  const headers = ['Name', 'Title', 'Date', 'Status'];
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('orders');
      const fetchedData = response.data.data.list;
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="p-5">
        <div className=" bg-gray-50 p-5 mt-10">
          <div className="p-5">
            <h2 className="text-2xl">My orders</h2>
          </div>
          <div>
            <Tables8 headers={headers} data={data} emptyMessage={'No orders yet!'} />
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeOrders;
