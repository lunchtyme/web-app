// components/List.jsx
import React, { useEffect, useState } from 'react';
import Tables4 from '../utils/Tables4';
import PaginationComponent from '../utils/PaginationComponent';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const List = () => {
  const headers = ['Image', 'Name', 'Price', 'Date'];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = Cookies.get('esp_lunchtyme_id');

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setError2(null);

    try {
      const response2 = await APIHelper.makeSecureAPICall(token).get('food-menu?limit=10', {
        params: { query },
      });
      setResult(response2.data.data.list);
      setCurrentPage(1);
    } catch (error) {
      setError2('Error fetching data. Please try again.');
    } finally {
      setLoading2(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('/food-menu');
      setData(response.data.data.list);
    } catch (error) {
      setMessage('Error fetching menu data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentData = (result.length > 0 ? result : data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen rounded">
      <div className="flex justify-between p-6 bg-white shadow-sm rounded-xl items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Lunches</h1>
      </div>

      <div className="flex justify-between items-center mb-8 space-x-4">
        <form
          onSubmit={handleSearch}
          className="w-full md:w-2/3 lg:w-1/2 flex items-center space-x-4"
        >
          <input
            value={query}
            onChange={handleInput}
            type="text"
            className="w-full h-12 px-4 rounded bg-gray-200 border-0 focus:ring-4 focus:ring-green-500 text-gray-700 placeholder-gray-500 transition duration-300"
            placeholder="Search category..."
          />
          <button
            type="submit"
            className="h-12 px-8 rounded-xl bg-green-600 text-white hover:opacity-90 transition duration-300 shadow-md"
          >
            Search
          </button>
        </form>
      </div>

      {message && <p className="text-red-500 text-center">{message}</p>}
      {error2 && <p className="text-red-500 text-center">{error2}</p>}

      {loading || loading2 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Tables4
            headers={headers}
            data={data}
            emptyMessage="No Lunches added!"
            className="mt-4 shadow-lg rounded-xl overflow-hidden bg-white"
          />
          <div className="flex justify-center mt-8">
            <PaginationComponent
              totalItems={result.length > 0 ? result.length : data.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              className="flex space-x-4"
            />
          </div>
        </>
      )}
    </section>
  );
};

List.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      food_image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      account_state: PropTypes.string.isRequired,
    }),
  ).isRequired,
  emptyMessage: PropTypes.string.isRequired,
};

export default List;
