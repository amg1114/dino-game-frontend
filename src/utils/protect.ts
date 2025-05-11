import { redirect } from 'react-router';
import { getUserProfile } from '../services/auth.service';
import { UserType } from '../models/user.interface';

export function requireAuth(allowedRoles?: UserType[]) {
  return async () => {
    const usuario = await getUserProfile();

    if (!usuario) {
      throw redirect('/iniciar-sesion');
    }

    if (allowedRoles?.length && !allowedRoles.includes(usuario.data.tipo)) {
      throw redirect('/unauthorized');
    }

    return null; // Pasa validación
  };
}
