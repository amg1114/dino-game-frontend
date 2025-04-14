import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';

function App() {
  const router = createBrowserRouter([{ path: '/', element: <StyleGuidePage /> }]);
  return <RouterProvider router={router} />;
}

export default App;
