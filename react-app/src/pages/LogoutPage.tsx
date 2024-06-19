import { FC, useEffect } from 'react';
import { AuthDal } from '../dal/AuthDal';

export const LogoutPage: FC = () => {
  useEffect(() => {
    AuthDal.logout().then(() => {
      location.href = '/';
    });
  }, []);

  return (
    <main>
      <h1>Logging you out...</h1>
    </main>
  );
};
