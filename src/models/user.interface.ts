export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipo: UserType;
  fechaNacimiento: Date;
  pais: string;
  sexo: string;
}

export type UserType = 'ESTANDAR' | 'ADMINISTRATOR' | 'DEVELOPER';
