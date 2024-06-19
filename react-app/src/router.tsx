import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { UsersDal } from './dal/UsersDal';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { LoginSuccessPage } from './pages/LoginSuccessPage';
import { LogoutPage } from './pages/LogoutPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { useSessionStore } from './stores/SessionStore';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      try {
        const me = await UsersDal.getMe();
        useSessionStore.setState({ me });
        return me || null;
      } catch (err) {
        return null;
      }
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/login/success',
        element: <LoginSuccessPage />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
      {
        path: '/profile/me',
        element: <MyProfilePage />,
      },
    ],
  },
]);
