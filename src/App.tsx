import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router';

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

import { VideoGamesPage } from './pages/videogames/pages/VideoGamesPage';
import { VideoGamePageInfo } from './pages/videogames/pages/VideoGamePageInfo';
import { CategoryPage } from './pages/category/CategoryPage';
import { CategoryIndex } from '@pages/category/CategoryIndex';

import { RecoverAccount } from '@pages/auth/RecoverAccount';

import { PROFILE_ROUTES } from '@pages/profile/routes';
import { DASHBOARD_ROUTES } from '@pages/dashboard/routes';
import { Report } from '@pages/videogames/components/videogame/Report';

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
            {
              path: 'recuperar-cuenta/:token',
              element: <RecoverAccount />,
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
          path: 'juegos',
          element: <VideoGamesPage />,
        },
        {
          path: 'juegos/:slug',
          element: <VideoGamePageInfo />,
          children: [
            {
              path: 'reportar',
              element: <Report />,
            }
          ],
        },
        PROFILE_ROUTES,
        DASHBOARD_ROUTES,
      ],
    },
    { path: 'unauthorized', element: <Unauthorized /> },
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
