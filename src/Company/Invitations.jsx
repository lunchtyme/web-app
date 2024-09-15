import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import APIHelper from '../utils/APIHelper';
import moment from 'moment';
moment.locale();

const Invitations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState({
    employee_work_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const [invitations, setInvitations] = useState([]);

  const token = Cookies.get('esp_lunchtyme_id');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError('');
    setSuccess('');
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await APIHelper.makeSecureAPICall(token).post('invitations', {
        employee_work_email: email.employee_work_email,
      });

      if (response.status === 200) {
        setSuccess('Invitation sent successfully!');
        setEmail({ employee_work_email: '' });
        setIsModalOpen(false);
        setToast({ message: 'Invitation sent successfully!', type: 'success' });
        setInvitations();
      }
    } catch (error) {
      setError('Failed to send the invitation. Please try again.');
      console.log(error.response.data);
      setToast({ message: 'Failed to send the invitation. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const response = await APIHelper.makeSecureAPICall(token).get('invitations/list');
      console.log(response.data.data[0].id);
      setInvitations(response.data.data); // Update state with fetched data
    } catch (error) {
      setError('Failed to fetch invitations. Please try again.');
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();

    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [toast.message]);

  return (
    <>
      <section className="bg-gray-200 h-[100vh]">
        <div className="drawer lg:drawer-open">
          <div className="drawer-content flex flex-col p-7">
            <div className="p-5 pt-10 w-full mt-10 bg-gray-50">
              <div className="flex items center align-middle p-2 justify-between">
                <h1 className="text-2xl">Invitations</h1>
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-green-600 text-white rounded text-lg"
                >
                  Invite Employee
                </button>
              </div>

              <div className="overflow-x-auto mt-10">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-lg">Invitation ID</th>
                      <th className="text-lg">Employee email</th>
                      <th className="text-lg">Code</th>
                      <th className="text-lg">Date</th>
                      <th className="text-lg">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitations.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-10">
                          <p className="text-xl text-gray-500">
                            You haven't sent any invitations yet!
                          </p>
                        </td>
                      </tr>
                    ) : (
                      invitations.map((invitation) => (
                        <tr key={invitation.id}>
                          <td>{invitation.id}</td>
                          <td>{invitation.employee_work_email}</td>
                          <td>{invitation.invitation_token}</td>
                          <td>{moment(invitation.created_at).format('llll')}</td>
                          <td>{invitation.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Invite Employee</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="employee_work_email"
                    value={email.employee_work_email}
                    onChange={(e) => setEmail({ employee_work_email: e.target.value })}
                    placeholder="Enter employee email"
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
                    {loading ? 'Sending...' : 'Send Invitation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast.message && (
          <div
            className={`toast toast-top toast-end ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white rounded mt-5 mr-10`}
          >
            <div className="toast-body">{toast.message}</div>
          </div>
        )}
      </section>
    </>
  );
};

export default Invitations;
