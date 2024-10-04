import React, { useEffect, useState } from 'react';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';
import StatCard from '../utils/StatCard';
import Tables7 from '../utils/Tables7';
import { Navigate } from 'react-router-dom';

const Billings = () => {
  const headers = ['Name', 'Email', 'Date', 'Type', 'Status', 'Amount'];
  const [data, setData] = useState('');
  const [data2, setData2] = useState('');
  const [amount, setAmount] = useState('');
  const token = Cookies.get('esp_lunchtyme_id');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError('');
    setSuccess('');
  };

  const topUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await APIHelper.makeSecureAPICall(token).post('billings/topup', { amount });
      if (response.data.success) {
        setAmount(''); // Reset the amount field
        setSuccess('Topup in progress!');
        window.location.href = response.data.data;
        console.log(response.data.data);
      } else {
        throw new Error('Failed to top up');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const fetchTable = async () => {
    try {
      const response2 = await APIHelper.makeSecureAPICall(token).get('billings?limit=10');
      const fetchedData = response2.data.data.list;
      setData(fetchedData);
      console.log(response2.data.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchData = async () => {
    try {
      const response3 = await APIHelper.makeSecureAPICall(token).get('analytics/company');
      const fetchedData2 = response3.data.data;
      setData2(fetchedData2);
      console.log(fetchedData2);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format balance with commas
  const formatBalance = (balance) => {
    return new Intl.NumberFormat().format(balance);
  };

  return (
    <>
      <section className="rounded-lg shadow-lg bg-gray-100 w-full p-5">
        <div className="p-10">
          <div className="p-5 flex gap-10 items-center ">
            <h2 className="text-2xl">Balance</h2>

            <button onClick={toggleModal} className="btn bg-green-600 w-[6rem] text-lg text-white">
              Top up
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <StatCard number={`₦ ${formatBalance(data2.balance)}`} groupName={''} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded">
          <Tables7 headers={headers} data={data} emptyMessage={'No billings made!'} />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Top up your account</h2>
              <form onSubmit={topUp}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // Fix typo here
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="mr-4 px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-green-600 text-white rounded ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Topping up...' : 'Top up'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Billings;
