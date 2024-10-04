import React, { useEffect, useState } from 'react';
import Tables5 from '../utils/Tables5';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const Transactions = () => {
  const headers = ['ID', 'Email', 'Amount', 'Date', 'Name', 'Type'];
  const invitations = [];
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false); // Boolean instead of empty string
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const token = Cookies.get('esp_lunchtyme_id');

  const fetchTable = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('billings?limit=10');
      const fetchedData = response.data.data.list;
      console.log(fetchedData);
      setData(fetchedData);
      setShowSuccessToast(true);
    } catch (error) {
      setError(error);
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
    <>
      <section className="p-6 bg-gray-50 rounded">
        <div>
          <h2 className="text-2xl lato-bold">Transactions</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-gray-400 rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Tables5 headers={headers} data={data} emptyMessage="No transactions made!" />
        )}
        {/* {error && <p className="text-red-500">Error: {error.message}</p>} */}
        {showToast && (
          <div className="toast toast-end toast-top mr-10">
            <div className="alert alert-error text-white p-5">
              <span>{error.message}</span>
            </div>
          </div>
        )}

        {showSuccessToast && (
          <div className="toast toast-end toast-top mr-10 z-50">
            <div className="alert alert-success text-white p-5">
              <span>Table fetched successfully.</span>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Transactions;
