import axios from "axios";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Acess-Control-Allow-Origin": "*",
    Authorization: ``,
    Accept: "application/json",
  },
  baseURL: import.meta.env.VITE_API_URL,
});