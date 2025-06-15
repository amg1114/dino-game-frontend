import { Asset } from './asset.interface';

export interface Post {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  slug: string;
  cantidadLikes: number;
  autor: {
    nombre: string;
  };
  thumb: Asset;
}
