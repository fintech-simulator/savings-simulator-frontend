import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://savings-simulator-backend.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
