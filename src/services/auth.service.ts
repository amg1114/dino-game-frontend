import axios from 'axios';
import { Usuario } from '../models/user.interface';

export function getUserProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return axios.get<Usuario>('/api/auth/profile');
}
