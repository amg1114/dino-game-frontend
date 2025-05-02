import { Asset } from './asset.interface';
import { Categoria } from './categoria.interface';
import { Descuento } from './descuento.interface';

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
  descuentos: Descuento[];
  puntaje: number;
}
