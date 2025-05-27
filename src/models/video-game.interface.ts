import { Asset } from './asset.interface';
import { Categoria } from './categoria.interface';
import { Descuento } from './descuento.interface';

export interface VideoGame {
  id: number;
  precio: number;
  titulo: string;
  descripcion: string;
  fechaLanzamiento: string;
  slug: string;
  thumb: Asset;
  hero: Asset;
  assets?: Asset[];
  categorias: Categoria[];
  descuentos: Descuento[];
  puntaje: number;
  versions?: Version[];
}

export interface UserVideoGame {
  id: number;
  createdAt: string;
  deletedAt: string;
  fechaCompra: string;
  precio: number;
  videoGame: VideoGame;
}

export interface Version {
  version: string;
  descripcion: string;
  id: number;
  requisitos: Requisito[];
  createdAt: string;
  deletedAt: string;
}

export interface Requisito {
  id: number;
  createdAt: string;
  deletedAt: string;
  requisito: string;
}
