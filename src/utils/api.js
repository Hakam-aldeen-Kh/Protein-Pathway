import axios from "axios";

// Create a global axios instance for authenticated requests
const api = axios.create({
  baseURL: "https://clean-architcture-express.vercel.app/api/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true, // This ensures cookies are sent with requests
});

export default api;
