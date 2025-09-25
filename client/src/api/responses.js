import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/responses";

export const createResponse = (data) => axios.post(API_URL, data);
export const getResponses = (formId) => axios.get(`${API_URL}/${formId}`);
