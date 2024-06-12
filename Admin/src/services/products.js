import api from "./api";

export const getAllProducts = () => {
  return api.get("/products/all");
};

export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};

export const addNewProduct = (payload) => {
  return api.post("/products/:id", payload);
};

export const deleteProductById = (productId) => {
  return api.delete(`/products/${productId}`);
};
