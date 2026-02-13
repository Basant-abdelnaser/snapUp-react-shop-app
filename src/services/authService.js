import axios from "axios";

const API_URL = "https://dummyjson.com";

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/user/login`, data);
  return res.data;
};
