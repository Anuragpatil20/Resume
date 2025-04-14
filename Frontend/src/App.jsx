import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import AdminResumeList from './components/AdminResumeList';

function App() {
  const [users, setUsers] = useState([]);
  const [adminView, setAdminView] = useState(false);

  useEffect(() => {
    // Fetch users from backend (assumes you have a GET /users route)
    axios.get('http://localhost:5000/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Upload & Admin Dashboard</h1>
        <button
          onClick={() => setAdminView(!adminView)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Switch to {adminView ? 'User' : 'Admin'} View
        </button>
      </div>

      {adminView ? (
        <AdminResumeList />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
