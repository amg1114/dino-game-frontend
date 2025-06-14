import { Dashboard } from '@pages/dashboard/Dashboard';
import { DashboardVideoGames } from '@pages/dashboard/video-games/DashboardVideoGames';
import { CreateVideoGame } from '@pages/dashboard/video-games/create/CreateVideoGame';
import { RouteObject } from 'react-router';
import { EditVideoGame } from './video-games/edit/EditVideoGame';
import { requireAuth } from '@utils/protect';
import { ManageDevRequest } from './developers/requests/ManageDevRequest';
import { RespRequest } from './developers/requests/RespRequest';

import { ManageCategories } from './categories/ManageCategories';
import { CreateCategory } from './categories/CreateCategoria';
import { UpdateCategory } from './categories/UpdateCategory';

import { Reports } from './reports/Reports';
import { Descuentos } from '@pages/dashboard/video-games/descuentos/Descuentos';
import { DescuentoForm } from '@pages/dashboard/video-games/descuentos/components/DescuentoForm';
import { ManageDevelopers } from './developers/ManageDevelopers';

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
  {
    path: 'desarrolladores',
    loader: requireAuth(['ADMINISTRATOR']),
    element: <ManageDevelopers />,
  },
];
