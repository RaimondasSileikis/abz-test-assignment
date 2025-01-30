import { useState, useEffect } from "react";
import axios from "axios";

export default function UserById({ userId, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`);
        if (response.data.success) {
            console.log('API user by id response,', response);

          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserById();
    }
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Add more user details here if needed */}
          </div>
        ) : (
          <p>User not found.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
