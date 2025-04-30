import { Asset } from './asset.interface';
import { Categoria } from './categoria.interface';

export interface VideoGame {
  id: number;
  precio: number;
  titulo: string;
  descripcion: string;
  fechaLanzamiento: Date;
  slug: string;
  thumb: Asset;
  hero: Asset;
  categorias: Categoria[];
  puntaje: number;
}
