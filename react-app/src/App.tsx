import { NavLink, Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <>
      <header>
        auth-test
        <nav>
          <menu>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </menu>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
