import api from "./api";

export const getAllSellRequests = () => {
  return api.get("/sellitForMe/all");
};

export const getSellRequestById = (SellitForMeID) =>{
  return api.get(`/sellitForMe/${SellitForMeID}`)
};
export const saveSellRequest = (payload) => {
  return api.post("/sellitForMe/", payload);
};
export const deleteSellRequestById = (SellitForMeID) => {
  return api.delete(`/sellitForMe/${SellitForMeID}`);
};
