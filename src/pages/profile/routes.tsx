import { ProfileLayout } from './ProfileLayout';
import { RouteObject } from 'react-router';
import { requireAuth } from '@utils/protect';
import { ProfileInfo } from './profileInfo/ProfileInfo';
import { ProfilePasswordReset } from './profilePasswordReset/ProfilePasswordReset';
import { ProfileLibrary } from './library/ProfileLibrary';
import { SolicitudDesarrollador } from './solicitudDesarrollador/SolicitudDesarrollador';

export const PROFILE_ROUTES: RouteObject = {
  path: 'perfil',
  loader: requireAuth(),
  element: <ProfileLayout />,
  children: [
    {
      path: '',
      index: true,
      element: <ProfileInfo />,
    },
    {
      path: 'restablecer-contrasena',
      element: <ProfilePasswordReset />,
    },
    {
      path: 'biblioteca',
      element: <ProfileLibrary />,
    },
    {
      path: 'solicitud-desarrollador',
      element: <SolicitudDesarrollador />,
    },
  ],
};
