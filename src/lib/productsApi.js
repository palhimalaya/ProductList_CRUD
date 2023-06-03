import axios from "axios";

const baseURL = "https://product-fhqo.onrender.com/products";

const getProducts = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const addProducts = async (product) => {
  try {
    const response = await axios.post(baseURL, product);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const editProduct = async (product) => {
  try {
    const response = await axios.patch(`${baseURL}/${product.id}`, product);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { getProducts, addProducts, getProduct, editProduct, deleteProduct };
