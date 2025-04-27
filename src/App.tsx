import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import GlobalLayout from '../src/partials/layoutGlobal';
import AuthProvider from './providers/AuthContext';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <GlobalLayout />,
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
