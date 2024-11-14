import axios from 'axios';

export const axiosInstance = axios.create({
  timeout: 30000,  // 30 seconds
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
  }
}); 