import api from "./api";

export const getAllInspectionRequests = () => {
  return api.get("/inspectionRequest/all");
};

export const getInspectionRequestById = (inspectionId) => {
  return api.get(`/inspectionRequest/${inspectionId}`);
};

export const addInspection = (payload) => {
  return api.post("/inspectionRequest/id", payload);
};

export const deleteinspectionRequestById = (inspectionId) => {
  return api.delete(`/inspectionRequest/${inspectionId}`);
};
