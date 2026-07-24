import api from "./axios";

export const getApplications = (params) => api.get("/applications", { params });
export const getStats = () => api.get("/applications/stats");
export const createApplication = (data) => api.post("/applications", data);
export const updateApplication = (id, data) => api.put(`/applications/${id}`, data);
export const deleteApplication = (id) => api.delete(`/applications/${id}`);
