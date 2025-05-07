export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipo: 'ESTANDAR' | 'ADMINISTRATOR' | 'DEVELOPER';
  fechaNacimiento: Date;
  pais: string;
  sexo: string;
}
