import axios from "axios";
const API_URL = "https://dummyjson.com/carts";

export const addToCart = async (data) => {
  console.log(data);
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const getCartItems = async (id) => {
  const res = await axios.get(`${API_URL}/user/${id}`);
  return res.data;
};
export const updateCart = async (id, data) => {
  const res = await axios.put(`${API_URL}/user/${id}`, data);
  return res.data;
};

export const removeCart = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
