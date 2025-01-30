import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

export const getToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/token`);
    if (response.data.success) {
        console.log('API response get tokens', response);
      return response.data.token;
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
  return null;
};

export const createUser = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('API response create User', response);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const response = await axios.get(`${API_URL}/positions`);
    console.log('API response get Positions', response);
    return response.data.positions;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
};

