import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import GlobalLayout from '../src/partials/layoutGlobal';
import AuthProvider from './providers/AuthContext';
import { ErrorBoundary } from './partials/ErrorElement';
import { HomePage } from './pages/home/HomePage';

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
          ],
        },
      ],
    },
  ]);

  return <AuthProvider child={<RouterProvider router={router} />} />;
}

export default App;
