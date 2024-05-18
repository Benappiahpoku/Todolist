import axios from "axios";

const API_URL = "http://localhost:5001/api"; // replace with your API's base URL

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, {
    username, // change 'name' to 'username'
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth`, {
    email,
    password,
  }); // make sure the endpoint is '/users/login'
  return response.data;
};
