import { FC } from 'react';
import { API_URL } from '../config';
import { openPopup } from '../utils/openPopup';

export const LoginPage: FC = () => {
  const handleLogin = () => {
    // TODO handle popup closed without successful login
    openPopup({
      url: `${API_URL}/auth/google`,
      target: 'fed-login',
      onClose: () => {
        location.href = '/';
      },
    });
  };

  return (
    <main>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </main>
  );
};
