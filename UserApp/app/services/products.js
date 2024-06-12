import api from "./api";

export const getAllProducts = (userId) => {
  return api.get("/products/all");
 
};

export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};
export const getProductsByName = (modelName) => {
  return api.get(`/products/model/${modelName}`);
};
export const getUserProducts = (userId) => {
  return api.get(`/products/user/${userId}`);
};

export const addNewProduct = (payload) => {
  return api.post("/products/", payload);
};

export const deleteProductById = (productId) => {
  return api.delete(`/products/${productId}`);
};