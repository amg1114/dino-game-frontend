import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import GlobalLayout from './partials/layoutGlobal';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import AuthProvider from './providers/AuthContext';
import { NewsPage } from './pages/blog/BlogIndex';
import { VistaNoticia } from './pages/blog/BlogEntry';

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
