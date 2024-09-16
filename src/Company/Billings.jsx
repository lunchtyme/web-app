import React, { useEffect, useState } from 'react';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';
import StatCard from '../utils/StatCard';
import Tables2 from '../utils/Tables2';

const Billings = () => {
  const headers = ['Title', 'Description', 'Date', 'Amount'];
  const [data, setData] = useState('');
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
        setSuccess('Top-up successful!');
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
  return (
    <>
      <section className="w-full p-5">
        <div className="p-5">
          <div className="p-5">
            <h2 className="text-2xl">Billings</h2>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <StatCard number={`₦ 0`} groupName={'Balance'} />
            </div>
            <div className="flex gap-5 items-center">
              <h2 className="text-xl font-semibold">Top up your balance</h2>
              <button
                onClick={toggleModal}
                className="btn bg-green-600 w-[6rem] text-lg text-white"
              >
                Top up
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded">
          <Tables2 headers={headers} data={data} emptyMessage={'No billings made!'} />
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
