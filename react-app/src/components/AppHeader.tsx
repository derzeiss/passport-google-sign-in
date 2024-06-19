import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSessionStore } from '../stores/SessionStore';

export const AppHeader: FC = () => {
  const me = useSessionStore((s) => s.me);

  return (
    <header>
      express-passport-google-oauth
      <nav>
        <menu>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {me ? (
              <NavLink to="/profile/me">
                {me.firstname} {me.lastname}
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
        </menu>
      </nav>
    </header>
  );
};
