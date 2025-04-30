import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import GlobalLayout from '../src/partials/layoutGlobal';
import AuthProvider from './providers/AuthContext';
import { ErrorBoundary } from './partials/ErrorElement';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <GlobalLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '',
          element: <StyleGuidePage />,
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
