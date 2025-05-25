import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router';

import { requireAuth } from './utils/protect';

import { AuthProvider } from './providers/AuthContext';
import { AlertProvider } from './providers/AlertContext';

import { GlobalLayout } from './partials/layoutGlobal';
import { ErrorBoundary } from './partials/ErrorElement';
import { Unauthorized } from './partials/Unauthorized';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { PasswordRecovery } from './pages/auth/PasswordRecovery';
import { PasswordReset } from './pages/auth/PasswordReset';

import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { BlogPage } from './pages/blog/BlogIndex';
import { BlogEntry } from './pages/blog/BlogEntry';

import { ProfileLayout } from './pages/profile/ProfileLayout';
import { ProfileInfo } from './pages/profile/profileInfo/ProfileInfo';
import { ProfilePasswordReset } from './pages/profile/profilePasswordReset/ProfilePasswordReset';
import { ProfileLibrary } from './pages/profile/library/ProfileLibrary';
import { SolicitudDesarrollador } from './pages/profile/solicitudDesarrollador/SolicitudDesarrollador';
import { Dashboard } from './pages/dashboard/Dashboard';
import { CategoryPage } from './pages/category/CategoryPage';
import { DescuentoForm } from './pages/descuentos/components/DescuentoForm';
import { DescuentoPage } from './pages/descuentos/DescuentoPage';

export function App() {
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
          path: 'about',
          element: <AboutPage />,
        },
        {
          path: 'blog',
          element: <BlogPage />,
        },
        {
          path: 'blog/:slug',
          element: <BlogEntry />,
        },
        {
          path: 'categorias/:slug',
          element: <CategoryPage />
        },
        {
          path: 'perfil',
          loader: requireAuth(),
          element: <ProfileLayout />,
          children: [
            {
              path: '',
              index: true,
              element: <ProfileInfo />,
            },
            {
              path: 'restablecer-contrasena',
              element: <ProfilePasswordReset />,
            },
            {
              path: 'biblioteca',
              element: <ProfileLibrary />,
            },
            {
              path: 'solicitud-desarrollador',
              element: <SolicitudDesarrollador />,
            },
          ],
        },
        {
          path: 'dashboard',
          element: <ProfileLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: 'juegos/:id/descuentos',
              element: <DescuentoPage />,
              children: [
                {
                  path: 'nuevo',
                  element: <DescuentoForm />,
                }]
            }

          ],
        },
        { path: 'unauthorized', element: <Unauthorized /> },
      ],
    },
  ]);

  return (
    <AuthProvider
      child={
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      }
    />
  );
}
