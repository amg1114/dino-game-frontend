import { Dashboard } from '@pages/dashboard/Dashboard';
import { DashboardVideoGames } from '@pages/dashboard/video-games/DashboardVideoGames';
import { CreateVideoGame } from '@pages/dashboard/video-games/create/CreateVideoGame';
import { RouteObject } from 'react-router';
import { EditVideoGame } from './video-games/edit/EditVideoGame';
import { requireAuth } from '@utils/protect';
import { Descuentos } from '@pages/descuentos/Descuentos';
import { DescuentoForm } from '@pages/descuentos/components/DescuentoForm';

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
    path: 'juegos/:slug/descuentos',
    loader: requireAuth(['DEVELOPER']),
    element: <Descuentos />,
    children: [
      {
        path: 'nuevo',
        element: <DescuentoForm />
      }
    ]

  }
];
