import axios from 'axios';

// Use the VITE_API_URL from environment variables (it will change based on local vs production)
const apiUrl: string = import.meta.env.VITE_API_URL;

// console.log(apiUrl)

const axiosInstance = axios.create({
  baseURL: apiUrl,  // The base URL will be pulled from the environment variable
  timeout: 10000,    // Optional: Set a timeout for requests
});

export default axiosInstance;