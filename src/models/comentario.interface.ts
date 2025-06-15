import { Usuario } from './user.interface';

export interface Comentario {
  id: number;
  createdAt: Date;
  deletedAt: null;
  comentario: string;
  user: Usuario;
}
