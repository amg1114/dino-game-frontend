import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import GlobalLayout from '../src/partials/layoutGlobal'; 

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <GlobalLayout />, 
      children: [
        {
          path: '/',
          element: <StyleGuidePage /> 
        }
      ]
    }
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;