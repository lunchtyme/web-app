import React, { useEffect, useState } from 'react';
import Table2 from '../utils/Tables2';
import PaginationComponent from '../utils/PaginationComponent';
import APIHelper from '../utils/APIHelper';
import Cookies from 'js-cookie';

const List = () => {
  const headers = ['Name', 'Price', 'Status', 'Date'];
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = Cookies.get('esp_lunchtyme_id');

  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]); 
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setError2(null);

    try {
      const response2 = await APIHelper.makeSecureAPICall(token).get('food-menu?limit=20', {
        params: { query },
      });
      console.log(response2);
      setResult(response2.data.data.list); 
      setCurrentPage(1); 
    } catch (error) {
      setError2('Error fetching data. Please try again.');
      console.error(error);
    } finally {
      setLoading2(false); 
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('/food-menu');
      const fetchedData = response.data.data.list;
      setData(fetchedData); // Store data in state
    } catch (error) {
      setMessage('Error fetching menu data');
      console.error(error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get the data to display based on pagination
  const currentData = (result.length > 0 ? result : data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="p-5">
        <div className="flex justify-between p-5 bg-gray-300 rounded-lg items-center">
          <div className="text-3xl">Lunches</div>
        </div>
        <div className="w-full flex justify-between items-center border-4">
          <div className="w-[80%] gap-10 p-5">
            <form onSubmit={handleSearch}>
              <input
                value={query}
                onChange={handleInput}
                type="text"
                className="input w-[60%] h-[3.5rem] bg-gray-100 input-bordered"
                placeholder="Enter category"
              />
              <button type="submit" className="btn text-white bg-green-600 ml-20 tracking-wide">
                Search
              </button>
            </form>
          </div>
          {/** 
          <div className="dropdown mr-20">
            <div
              tabIndex={1}
              role="button"
              className="btn m-1 text-md bg-gray-50 text-black w-[6rem]"
            >
              Filter
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[3] w-52 p-2 shadow"
            >
              <li className="text-lg">
                <a>Main Course</a>
              </li>
              <li className="text-lg">
                <a>Appetizer</a>
              </li>
              <li className="text-lg">
                <a>Soup</a>
              </li>
              <li className="text-lg">
                <a>Beverage</a>
              </li>
            </ul>
          </div>
          */}
        </div>

        {/* Display messages */}
        {message && <p className="text-red-500">{message}</p>}
        {error2 && <p className="text-red-500">{error2}</p>}

        {/* Display loading state */}
        {loading || loading2 ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table2
              headers={headers}
              data={currentData} 
              emptyMessage="No Lunches added!"
            />
            <div className="p-5">
              <PaginationComponent
                totalItems={result.length > 0 ? result.length : data.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default List;
