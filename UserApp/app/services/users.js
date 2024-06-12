import api from "./api";

export const getDetails = () => {
  return api.get("/users/me");
};

export const login = (payload) => {
  return api.post("/users/login", payload);
};

export const signup = (payload) => {
  return api.post("/users/signup", payload);
};
