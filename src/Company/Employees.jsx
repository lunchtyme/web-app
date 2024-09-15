import React, { useEffect, useState } from 'react';
import Tables3 from '../utils/Tables3';
import Cookies from 'js-cookie';
import APIHelper from '../utils/APIHelper';
import PaginationComponent from '../utils/PaginationComponent';

const Employees = () => {
  const headers = ['Name', 'Email', 'Date Joined', 'Status', 'Balance'];
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = Cookies.get('esp_lunchtyme_id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await APIHelper.makeSecureAPICall(token).get('users/employees?limit=10');
        setData(response.data.data.list);
      } catch (error) {
        setMessage('Error fetching employees');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setError(null);

    try {
      const response = await APIHelper.makeSecureAPICall(token).get('users/employees', {
        params: { query },
      });
      setResult(response.data.data.list);
      setCurrentPage(1);
    } catch (error) {
      setError('Error fetching employees');
      console.error(error);
    } finally {
      setLoading2(false);
    }
  };

  const currentData = (result.length ? result : data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="p-8 bg-gray-50 min-h-screen rounded-lg mt-10">
      <div className="p-6 bg-white shadow-md rounded-lg mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Employees</h2>
      </div>

      <form className="flex gap-4 mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          className="flex-grow h-12 px-4 rounded-lg bg-gray-200 border-0 focus:ring-4 focus:ring-green-500 text-gray-700 placeholder-gray-500"
          placeholder="Search employee"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="h-12 px-6 rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading || loading2 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <Tables3
            headers={headers}
            data={currentData}
            emptyMessage="No employees found!"
            className="bg-white shadow-md rounded-lg overflow-hidden"
          />
          <PaginationComponent
            totalItems={result.length || data.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            className="mt-6"
          />
        </>
      )}
    </section>
  );
};

export default Employees;
