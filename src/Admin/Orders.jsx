import React, { useEffect, useState } from 'react';
import Tables6 from '../utils/Tables6';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Orders = () => {
  const headers = ['ID', 'Date', 'Status', 'Amount', 'Customer'];
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Use false instead of null
  const [error, setError] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const token = Cookies.get('esp_lunchtyme_id');

  const fetchTable = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('orders');
      const fetchedData = response.data.data.list;
      console.log(fetchedData);
      setShowSuccessToast(true);
      setData(fetchedData); // Correctly set the fetched data
    } catch (error) {
      setError(`Error: ${error.message}`); // Set error message correctly
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  return (
    <section className="bg-gray-50 p-6 rounded h-auto">
      <div>
        <h2 className="text-2xl">Orders</h2>
      </div>
      <div className="h-auto">
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <Tables6 headers={headers} data={data} emptyMessage="No orders yet!" />
        )}
      </div>

      {showToast && (
        <div className="toast toast-end toast-top mr-10 mt-14">
          <div className="alert alert-error text-white p-5 rounded">
            <span>{error}</span>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="toast toast-end toast-top mr-10 mt-14">
          <div className="alert alert-success text-white p-5 rounded">
            <span>Table fetched successfully.</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Orders;
