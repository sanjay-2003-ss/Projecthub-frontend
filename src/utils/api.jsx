import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: 'https://projecthub-backend.vercel.app/api',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  try {
    let token = null;
    const user = auth.currentUser;
    if (user) token = await user.getIdToken();
    else token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    console.warn('Error adding token', err);
  }
  return config;
});

export default api;
