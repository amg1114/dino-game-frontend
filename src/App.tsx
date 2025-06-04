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
import { CategoryPage } from './pages/category/CategoryPage';

import { ProfileLayout } from './pages/profile/ProfileLayout';
import { ProfileInfo } from './pages/profile/profileInfo/ProfileInfo';
import { ProfilePasswordReset } from './pages/profile/profilePasswordReset/ProfilePasswordReset';
import { ProfileLibrary } from './pages/profile/library/ProfileLibrary';
import { SolicitudDesarrollador } from './pages/profile/solicitudDesarrollador/SolicitudDesarrollador';

import { DASHBOARD_ROUTES } from '@pages/dashboard/routes';
import { VideoGamesPage } from './pages/videogames/pages/VideoGamesPage';
import { VideoGamePageInfo } from './pages/videogames/pages/VideoGamePageInfo';
import { CategoryIndex } from '@pages/category/CategoryIndex';

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
          path: 'categorias',
          element: <CategoryIndex />,
        },
        {
          path: 'categorias/:slug',
          element: <CategoryPage />,
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
          children: DASHBOARD_ROUTES,
        },
        {
          path: 'juegos',
          element: <VideoGamesPage />,
        },
        {
          path: 'juegos/:slug',
          element: <VideoGamePageInfo />,
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
