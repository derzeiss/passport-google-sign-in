import { FC, useEffect } from 'react';
import { useSessionStore } from '../stores/SessionStore';
import { Link, useNavigate } from 'react-router-dom';

export const MyProfilePage: FC = () => {
  const navigate = useNavigate();
  const me = useSessionStore((state) => state.me);

  useEffect(() => {
    if (!me) navigate('/login');
  }, [me, navigate]);

  if (!me) return null;

  return (
    <main>
      <h1>Hi {me.firstname}!</h1>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </main>
  );
};
