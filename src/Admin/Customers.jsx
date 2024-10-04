import React, { useEffect, useState } from 'react';
import Tables3 from '../utils/Tables3';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Customers = () => {
  const headers = ['Name', 'Email', 'Date Joined', 'Status', 'Balance'];
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const token = Cookies.get('esp_lunchtyme_id');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('users?limit=10');
      setData(response.data.data.list);
      setShowSuccessToast(true);
    } catch (error) {
      setMessage('Error fetching customers.');
      setShowToast(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    <section className="p-6 bg-gray-50 rounded">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-xl lato-bold">Customers</h2>
          </div>
          <Tables3 headers={headers} data={data} emptyMessage="No customers yet!" />
        </div>
      )}

      {showToast && (
        <div className="toast toast-end toast-top mr-5">
          <div className="alert alert-error text-white p-5 rounded">
            <span>{message}</span>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="toast toast-end toast-top mr-5">
          <div className="alert alert-success text-white p-5 rounded">
            <span>Table fetched successfully.</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Customers;
