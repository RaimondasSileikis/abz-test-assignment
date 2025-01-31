import { useState, useEffect } from "react";
import UserById from "./UserById";
import { getUsers } from "../services/apiService";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [getUsersError, setGetUsersError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const data = await getUsers(page);
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || 'An unexpected error occurred');
                if (error.response?.data) {
                    setGetUsersError(error.response?.data)
                } else {
                    setGetUsersError({ message: "An unexpected error occurred" });
                }
            }
        };

        fetchUsers();
    }, [page]);

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
    };

    const handleCloseModal = () => {
        setSelectedUserId(null);
    };

    const handleShowMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <>
            {getUsersError?.message && <div className="text-center text-red-800 text-lg">{getUsersError.message}</div>}
            {getUsersError?.fails &&
                Object.entries(getUsersError.fails).map(([field, errors], i) => (
                    <div key={i} className="text-center text-red-800 text-sm">
                        {field}: {errors.join(", ")}
                    </div>
                ))}
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-gray-50">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="text-center hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 items-center justify-center">
                                <img
                                    src={user.photo}
                                    className="size-12 object-cover rounded-full"
                                />
                                <h4 className="mt-4 text-lg font-bold">{user.name}</h4>
                                <h4 className="mt-4">{user.position}</h4>
                                <h4 className="mt-4">{user.email}</h4>
                                <h4 className="mt-4">{user.phone}</h4>
                                <h4 className="mt-4">
                                    {new Date(user.registration_timestamp * 1000).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
                    >
                        Show More
                    </button>
                </div>
                {selectedUserId && <UserById userId={selectedUserId} onClose={handleCloseModal} />}
            </div>
        </>
    );
}
