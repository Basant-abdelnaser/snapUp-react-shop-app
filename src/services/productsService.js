import axios from "axios";
const API_URL = "https://dummyjson.com";

export const getAllCategories = async () => {
  const res = await axios.get(`${API_URL}/products/category-list`);
  return res.data;
};

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};
export const getProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}/products/category/${category}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};
