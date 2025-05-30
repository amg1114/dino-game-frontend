import { Dashboard } from '@pages/dashboard/Dashboard';
import { DashboardVideoGames } from '@pages/dashboard/video-games/DashboardVideoGames';
import { CreateVideoGame } from '@pages/dashboard/video-games/create/CreateVideoGame';
import { RouteObject } from 'react-router';
import { EditVideoGame } from './video-games/edit/EditVideoGame';
import { requireAuth } from '@utils/protect';
import { Reports } from './reports/Reports';

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
    path: 'reportes',
    loader: requireAuth(['ADMINISTRATOR']),
    element: <Reports />,
  }
];
