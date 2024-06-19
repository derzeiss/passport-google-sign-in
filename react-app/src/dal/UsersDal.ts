import { API_URL } from '../config';
import { User } from '../types/User';
import { fetchJson } from '../utils/fetchJson';

const getMe = () => fetchJson<User>(`${API_URL}/api/users/me`);

export const UsersDal = { getMe };
