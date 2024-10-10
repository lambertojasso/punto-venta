import axios from "axios";

const axiosPunto = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default axiosPunto;

