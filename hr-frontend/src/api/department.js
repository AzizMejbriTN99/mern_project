import axios from "axios";
const API_URL = "http://localhost:3000/api/departments";

export const getDepartments = () => axios.get(API_URL);
export const getDepartment = (id) => axios.get(`${API_URL}/${id}`);
export const createDepartment = (data) => axios.post(API_URL, data);
export const updateDepartment = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/${id}`);