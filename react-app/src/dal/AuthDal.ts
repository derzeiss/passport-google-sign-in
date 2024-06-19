import { API_URL } from '../config';
import { fetchJson } from '../utils/fetchJson';

const logout = () => fetchJson(`${API_URL}/auth/logout`) as Promise<void>;

export const AuthDal = { logout };
