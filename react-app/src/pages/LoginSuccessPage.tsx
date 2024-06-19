import { FC, useEffect } from 'react';

export const LoginSuccessPage: FC = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.close();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main>
      <h1>Login successful</h1>
      <p>This window should close in a few seconds.</p>
      <button onClick={() => window.close()}>Close manually</button>
    </main>
  );
};
