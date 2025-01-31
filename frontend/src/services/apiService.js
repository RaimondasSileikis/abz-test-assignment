import axios from "axios";

export const getToken = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/token`);
    if (response.data.success) {
      return response.data.token;
    }
  } catch (error) {
    alert(error.response?.data?.message);
  }
  return null;
};

export const createUser = async (token, userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response?.data);
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/positions`);
    return response.data.positions;
  } catch (error) {
    console.error("Error fetching positions:", error.response?.data);
    return [];
  }
};

export const getUsers = async (page = 1, count = 5) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        params: { page, count },
      });

      if (response.data.success) {
        return {
          users: response.data.users,
          pagination: {
            totalPages: response.data.total_pages,
            totalUsers: response.data.total_users,
            nextUrl: response.data.links?.next_url || null,
            prevUrl: response.data.links?.prev_url || null,
          },
        };
      }
    } catch (error) {
      console.error("Failed to get users:", error.response?.data);
      throw error;
    }
  };

  export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`);
      if (response.data.success) {
        return response.data.user;
      }
    } catch (error) {
      console.error("Failed to get user details:", error.response?.data);
      throw error;
    }
  };
