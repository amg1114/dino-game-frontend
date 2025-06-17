import { UserCalificacion } from './user-calificacion.interface';
import { UserVideoGame } from './video-game.interface';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipo: UserType;
  fechaNacimiento: string;
  pais: string;
  sexo: string;
  likes?: { noticiaID: number }[];
  password?: string;
  calificaciones?: UserCalificacion[];
  videoGames?: UserVideoGame[];
}

export type UserType = 'ESTANDAR' | 'ADMINISTRATOR' | 'DEVELOPER';
