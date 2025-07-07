import axios from "axios";

const api = axios.create({
  baseURL: "https://quickshow-m12s.onrender.com",
  withCredentials: true,
});

export default api;
