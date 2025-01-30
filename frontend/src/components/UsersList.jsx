import { useState, useEffect } from "react";
import axios from "axios";
import UserById from "./UserById";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const [pagination, setPagination] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users", {
        params: { page, count },
      });
      if (response.data.success) {
        console.log('USERS API response', response);

        setUsers(response.data.users);
        setPagination({
          totalPages: response.data.total_pages,
          totalUsers: response.data.total_users,
          nextUrl: response.data.links.next_url,
          prevUrl: response.data.links.prev_url,
        });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, count]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      <div className="mb-4 flex gap-2">
        <label htmlFor="count" className="font-medium">
          Users per page:
        </label>
        <select
          id="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="border rounded p-1"
        >
          {[5, 10, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="text-center hover:bg-blue-50 cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!pagination.prevUrl}
          className={`px-4 py-2 border rounded ${
            !pagination.prevUrl ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span className="font-medium">
          Page {page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!pagination.nextUrl}
          className={`px-4 py-2 border rounded ${
            !pagination.nextUrl ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>

      {selectedUserId && (
        <UserById userId={selectedUserId} onClose={handleCloseModal} />
      )}
    </div>
  );
}
