export interface News {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  slug: string;
  cantidadLikes: number;
  autor: {
    nombre: string;
  };
  thumb: {
    id: number;
    title: string;
    url: string;
  };
}
