import React, { useEffect, useState } from 'react';
import Tables3 from '../utils/Tables3';
import Cookies from 'js-cookie';
import APIHelper from '../utils/APIHelper';
import PaginationComponent from '../utils/PaginationComponent';

const Employees = () => {
  const headers = ['Name', 'Email', 'Date Joined', 'Status', 'Balance'];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = Cookies.get('esp_lunchtyme_id');

  //query
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //handle input
  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  //submit form
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response2 = await APIHelper.makeSecureAPICall(token).get('users/employees?limit=5', {
        params: { query },
      });
      console.log(response2);
      setResult(response2.data.data.list);
      setCurrentPage(1);
    } catch (error) {
      setError('Error fetching employees');
      console.error(error);
    } finally {
      setLoading2(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('users/employees?limit=10');
      const fetchedData = response.data.data.list;
      setData(fetchedData);
      console.log(fetchedData);
    } catch (error) {
      setMessage('Error fetching employees', error);
      console.log(error);
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
    <>
      <section className="w-full p-5">
        <div className="p-5">
          <div className="p-5">
            <h2 className="text-2xl">Employees</h2>
          </div>

          <form className="border-4 flex gap-10" onSubmit={handleSearch}>
            <input
              type="text"
              className="input w-[70%] p-2 h-[3.5rem]"
              placeholder="Search employee"
              onChange={handleInput}
            />
            <button className="btn bg-green-600 text-white">Search</button>
          </form>
        </div>
        <div>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
          {loading || loading2 ? (
            <p>Loading...</p>
          ) : (
            <>
              <Tables3
                headers={headers}
                data={data} // Display current data slice based on pagination
                emptyMessage="No Lunches added!"
              />

              <div className="p-5">
                <PaginationComponent
                  totalItems={result.length > 0 ? result.length : data.length}
                  itemsPerPage={currentPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Employees;
