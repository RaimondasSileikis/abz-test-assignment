import { useState, useEffect } from "react";
import { getUserById } from "../services/apiService";


export default function UserById({ userId, onClose }) {
    const [user, setUser] = useState(null);
    const [userByIdError, setUserByIdError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user details:", error.response?.data || 'An unexpected error occurred');
                if (error.response?.data) {
                    setUserByIdError(error.response?.data)
                } else {
                    setUserByIdError({ message: "An unexpected error occurred" });
                }
            }
        };

        if (userId) {
            getUser();
        }
    }, [userId]);

    if (!userId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">User Details</h2>
                {userByIdError ? (
                    <>
                        {userByIdError?.message && <div className="text-center text-red-800 text-lg">{userByIdError.message}</div>}
                        {userByIdError?.fails &&
                            Object.entries(userByIdError.fails).map(([field, errors], i) => (
                                <div key={i} className="text-center text-red-800 text-sm">
                                    {field}: {errors.join(", ")}
                                </div>
                            ))}
                    </>
                ) : user ? (
                    <div>
                        <div className="flex items-center justify-center">
                            <img
                                src={user.photo}
                                className="size-12 object-cover rounded-full"
                            />
                        </div>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Position:</strong> {user.position}</p>
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
