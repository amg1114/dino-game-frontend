export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipo: UserType;
  fechaNacimiento: string;
  pais: string;
  sexo: string;
  calificacion?: number;
  likes?: { noticiaID: number }[];
}

export type UserType = 'ESTANDAR' | 'ADMINISTRATOR' | 'DEVELOPER';
