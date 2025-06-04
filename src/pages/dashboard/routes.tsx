import { Dashboard } from '@pages/dashboard/Dashboard';
import { DashboardVideoGames } from '@pages/dashboard/video-games/DashboardVideoGames';
import { CreateVideoGame } from '@pages/dashboard/video-games/create/CreateVideoGame';
import { RouteObject } from 'react-router';
import { EditVideoGame } from './video-games/edit/EditVideoGame';
import { requireAuth } from '@utils/protect';
import { ManageDevRequest } from './manage-dev-request/ManageDevRequest';
import { RespRequest } from './manage-dev-request/RespRequest';

import { ManageCategories } from './manageCategories/ManageCategories';
import { CreateCategory } from './manageCategories/CreateCategoria';
import { UpdateCategory } from './manageCategories/UpdateCategory';

import { Reports } from './reports/Reports';
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
        element: <DescuentoForm />,
      },
    ],
  },
  {
    path: 'solicitudes',
    loader: requireAuth(['ADMINISTRATOR']),
    element: <ManageDevRequest />,
    children: [
      {
        path: ':id',
        loader: requireAuth(['ADMINISTRATOR']),
        element: <RespRequest />,
      },
    ],
  },
  {
    path: 'categorias',
    loader: requireAuth(['ADMINISTRATOR']),
    element: <ManageCategories />,
    children: [
      {
        path: 'create',
        loader: requireAuth(['ADMINISTRATOR']),
        element: <CreateCategory />,
      },
      {
        path: 'update/:slug',
        loader: requireAuth(['ADMINISTRATOR']),
        element: <UpdateCategory />,
      },
    ],
  },
  {
    path: 'reportes',
    loader: requireAuth(['ADMINISTRATOR']),
    element: <Reports />,
  },
];
