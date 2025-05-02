import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import GlobalLayout from '../src/partials/layoutGlobal';
import AuthProvider from './providers/AuthContext';
import { ErrorBoundary } from './partials/ErrorElement';
import { HomePage } from './pages/home/HomePage';
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
        },
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
      ],
    },
  ]);

  return <AuthProvider child={<RouterProvider router={router} />} />;
}

export default App;
