import { Usuario } from './user.interface';

export type EstadoSolicitud = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface SolicitudDesarrollador {
  titulo: string;
  mensaje: string;
  user?: Usuario;
  id: number;
  createdAt: Date;
  deletedAt: null;
  estado: EstadoSolicitud;
}
