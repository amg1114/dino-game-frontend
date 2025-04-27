import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { StyleGuidePage } from './pages/styleGuide/StyleGuide';
import { VistaNoticia } from './pages/newsPage/VistaNoticia';
import { NewsPage } from './pages/newsPage/NewsPage';

function App() {
  const router = createBrowserRouter([{ path: '/', element: <StyleGuidePage /> },
  { path: '/blog', element: <NewsPage /> },
  { path: '/blog/:slug', element: <VistaNoticia /> }

  ]);
  return <RouterProvider router={router} />;
}

export default App;
