import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import { Login } from './pages/styleGuide/Login';
import { Register } from './pages/styleGuide/Register';
import AuthProvider from './providers/AuthContext';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <StyleGuidePage />,
      children: [{
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      }
      ]
    }
  ]);
  return <AuthProvider child={<RouterProvider router={router} />} />
}

export default App;
