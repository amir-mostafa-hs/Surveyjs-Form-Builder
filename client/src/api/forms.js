import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/forms";

export const getForms = () => axios.get(API_URL);
export const createForm = (data) => axios.post(API_URL, data);
export const getFormById = (id) => axios.get(`${API_URL}/${id}`);
export const getFormBySlug = (slug) => axios.get(`${API_URL}/public/${slug}`);
export const updateForm = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteForm = (id) => axios.delete(`${API_URL}/${id}`);
