import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';

export const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
