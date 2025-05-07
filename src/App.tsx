import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import GlobalLayout from './partials/layoutGlobal';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import AuthProvider from './providers/AuthContext';
import { ErrorBoundary } from './partials/ErrorElement';
import { HomePage } from './pages/home/HomePage';
import { NewsPage } from './pages/blog/BlogIndex';
import { VistaNoticia } from './pages/blog/BlogEntry';
import PasswordRecovery from './pages/auth/PasswordRecovery';
import PasswordReset from './pages/auth/PasswordReset';
import { ProfileLayout } from './pages/profile/ProfileLayout';
import { ProfileInfo } from './pages/profile/profileInfo/ProfileInfo';

function App() {
  const router = createBrowserRouter([
    {
      element: <GlobalLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '',
          element: <HomePage />,
          children: [
            {
              path: 'iniciar-sesion',
              element: <Login />,
            },
            {
              path: 'registro',
              element: <Register />,
            },
            {
              path: 'recuperar-contrasena',
              element: <PasswordRecovery />,
            },
            {
              path: 'recuperar-contrasena/:token',
              element: <PasswordReset />,
            },
          ],
        },
        {
          path: 'blog',
          element: <NewsPage />,
        },
        {
          path: 'blog/:slug',
          element: <VistaNoticia />,
        },
        {
          path: 'perfil',
          element: <ProfileLayout />,
          children: [
            {
              path: '',
              index: true,
              element: <ProfileInfo />,
            },
          ],
        },
      ],
    },
  ]);

  return <AuthProvider child={<RouterProvider router={router} />} />;
}

export default App;
