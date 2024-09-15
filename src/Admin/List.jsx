import React, { useEffect, useState } from 'react';
import Table2 from '../utils/Tables2';
import PaginationComponent from '../utils/PaginationComponent';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const List = () => {
  const headers = ['Name', 'Price', 'Status', 'Date'];
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = Cookies.get('esp_lunchtyme_id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await APIHelper.makeSecureAPICall(token).get('/food-menu');
        setData(response.data.data.list);
      } catch {
        setMessage('Error fetching menu data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleInput = (e) => setQuery(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoadingSearch(true);
    setError('');
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('food-menu', {
        params: { query },
      });
      setResult(response.data.data.list);
      setCurrentPage(1);
    } catch {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoadingSearch(false);
    }
  };

  const currentData = (result.length > 0 ? result : data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="p-8 bg-gray-50 min-h-screen rounded">
      <header className="flex justify-between p-6 bg-white shadow-sm rounded-xl mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Lunches</h1>
      </header>

      <div className="flex justify-between items-center mb-8 space-x-4">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full md:w-2/3 lg:w-1/2 space-x-4"
        >
          <input
            value={query}
            onChange={handleInput}
            type="text"
            className="w-full h-12 px-4 rounded-lg bg-gray-200 border-0 focus:ring-4 focus:ring-green-500 text-gray-700 placeholder-gray-500 transition"
            placeholder="Search category..."
          />
          <button
            type="submit"
            className="h-12 px-8 rounded-xl bg-green-600 text-white hover:opacity-90 transition shadow-md"
          >
            Search
          </button>
        </form>
      </div>

      {message && <p className="text-red-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading || loadingSearch ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Table2
            headers={headers}
            data={currentData}
            emptyMessage="No Lunches added!"
            className="mt-4 shadow-lg rounded-xl overflow-hidden bg-white"
          />
          <div className="flex justify-center mt-8">
            <PaginationComponent
              totalItems={result.length > 0 ? result.length : data.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              className="flex space-x-4"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default List;
