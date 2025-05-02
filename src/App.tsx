import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import GlobalLayout from './partials/layoutGlobal';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import AuthProvider from './providers/AuthContext';
import { ErrorBoundary } from './partials/ErrorElement';
import { HomePage } from './pages/home/HomePage';
import { NewsPage } from './pages/blog/BlogIndex';
import { VistaNoticia } from './pages/blog/BlogEntry';
import PasswordRecovery from './pages/auth/PasswordRecovery';

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
              path: 'recuperar-contraseña',
              element: <PasswordRecovery />,
            }
          ]
        },
        {
          path: 'blog',
          element: <NewsPage />,
        },
        {
          path: 'blog/:slug',
          element: <VistaNoticia />
        }

      ],
    },
  ]);

  return <AuthProvider child={<RouterProvider router={router} />} />;
}

export default App;
