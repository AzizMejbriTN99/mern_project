import axios from "axios";
const API_URL = "http://localhost:8080/api/audits";

export const getAudits = () => axios.get(API_URL);
export const getAudit = (id) => axios.get(`${API_URL}/${id}`);
export const createAudit = (data) => axios.post(API_URL, data);
export const updateAudit = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteAudit = (id) => axios.delete(`${API_URL}/${id}`);