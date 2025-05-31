import { Dashboard } from '@pages/dashboard/Dashboard';
import { DashboardVideoGames } from '@pages/dashboard/video-games/DashboardVideoGames';
import { CreateVideoGame } from '@pages/dashboard/video-games/create/CreateVideoGame';
import { RouteObject } from 'react-router';
import { EditVideoGame } from './video-games/edit/EditVideoGame';
import { requireAuth } from '@utils/protect';
import { ManageCategories } from './manageCategories/ManageCategories';
import { CreateCategory } from './manageCategories/CreateCategoria';
import { UpdateCategory } from './manageCategories/UpdateCategory';

export const DASHBOARD_ROUTES: RouteObject[] = [
  {
    index: true,
    loader: requireAuth(['DEVELOPER', 'ADMINISTRATOR']),
    element: <Dashboard />,
  },
  {
    path: 'juegos',
    loader: requireAuth(['DEVELOPER', 'ADMINISTRATOR']),
    element: <DashboardVideoGames />,
  },
  {
    path: 'juegos/crear',
    loader: requireAuth(['DEVELOPER']),
    element: <CreateVideoGame />,
  },
  {
    path: 'juegos/:slug/editar',
    loader: requireAuth(['DEVELOPER']),
    element: <EditVideoGame />,
  },
  {
    path: 'categorias',
    loader: requireAuth(['ADMINISTRATOR']),
    element: <ManageCategories />,
    children: [
      {
        path: 'create',
        loader: requireAuth(['ADMINISTRATOR']),
        element: <CreateCategory />
      },
      {
        path: 'update/:slug',
        loader: requireAuth(['ADMINISTRATOR']),
        element: <UpdateCategory />
      }
    ]
  },

];
