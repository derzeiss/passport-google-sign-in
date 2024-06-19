import { FC } from 'react';
import { useSessionStore } from '../stores/SessionStore';

export const HomePage: FC = () => {
  const me = useSessionStore((s) => s.me);

  return (
    <main>
      <h1>Home</h1>
      <p>Current user:</p>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </main>
  );
};
