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
  calificaciones?: { videoGameID: number; calificacion: number }[];
}

export type UserType = 'ESTANDAR' | 'ADMINISTRATOR' | 'DEVELOPER';
