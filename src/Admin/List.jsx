// components/List.jsxquery
import React, { useEffect, useState } from 'react';
import Tables4 from '../utils/Tables4';
import PaginationComponent from '../utils/PaginationComponent';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const headers = ['Image', 'Name', 'Price', 'Date', 'Status'];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const itemsPerPage = 5;
  const token = Cookies.get('esp_lunchtyme_id');

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setError2(null);

    try {
      const response2 = await APIHelper.makeSecureAPICall(token).get(`food-menu?query=${query}`);
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
      setShowSuccessToast(true);
    } catch (error) {
      setMessage('Error fetching menu data');
      setShowToast(true);
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

  const currentData = (result.length > 0 ? result : data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen rounded">
      {/* <div className="flex justify-between p-6 bg-white shadow-sm rounded-xl items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Lunches</h1>
      </div> */}

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
            placeholder="Search menu..."
          />
          <button
            type="submit"
            className="h-12 px-8 rounded-xl bg-green-600 text-white hover:opacity-90 transition duration-300 shadow-md"
          >
            Search
          </button>
        </form>
        <button className="btn btn-neutral" onClick={() => navigate('/admin/menu')}>
          Create menu
        </button>
      </div>

      {/* {message && <p className="text-red-500 text-center">{message}</p>}
      {error2 && <p className="text-red-500 text-center">{error2}</p>} */}
      {result.length === 0 && query && <p>No results found for "{query}"</p>}
      {result.length === 0 && !query && data.length === 0 && <p>No Lunches added!</p>}

      {loading || loading2 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Tables4
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
              onPageChange={handlePageChange}
              className="flex space-x-4"
            />
          </div>

          {showToast && (
            <div className="toast toast-end toast-top mr-10 mt-16">
              <div className="alert alert-error text-white p-5 rounded">
                <span>{message}</span>
              </div>
            </div>
          )}

          {showSuccessToast && (
            <div className="toast toast-end toast-top mr-10 mt-16">
              <div className="alert alert-success text-white p-5 rounded">
                <span>Table fetched successfully.</span>
              </div>
            </div>
          )}
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
