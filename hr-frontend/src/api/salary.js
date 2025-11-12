import axios from "axios";
const API_URL = "http://localhost:3000/api/salaries";

export const getSalaries = () => axios.get(API_URL);
export const getSalary = (id) => axios.get(`${API_URL}/${id}`);
export const createSalary = (data) => axios.post(API_URL, data);
export const updateSalary = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSalary = (id) => axios.delete(`${API_URL}/${id}`);