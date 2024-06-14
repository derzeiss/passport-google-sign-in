import { FC } from 'react';
import { API_URL } from '../config';

export const LoginPage: FC = () => {
  const handleLogin = () => {
    const width = 360;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const params = `scrollbars=no,resizable=no,status=no,location=yes,toolbar=no,menubar=no,width=${width},height=${height},left=${left},top=${top}`;
    const popup = open(`${API_URL}/auth/google`, 'fed-login', params);

    if (popup) popup.addEventListener('close', () => location.reload());
  };

  return (
    <main>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </main>
  );
};
