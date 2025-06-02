import { Asset } from './asset.interface';
import { Categoria } from './categoria.interface';
import { Comentario } from './comentario.interface';
import { Descuento } from './descuento.interface';
import { Usuario } from './user.interface';
import { Version } from './version.interface';

export interface VideoGame {
  id: number;
  precio: number;
  titulo: string;
  descripcion: string;
  fechaLanzamiento: string;
  slug: string;
  thumb: Asset;
  hero: Asset;
  categorias: Categoria[];
  descuentos: Descuento[];
  assets: Asset[];
  developer: Usuario;
  versions: Version[]
  comentarios: Comentario[];
  calificaciones: { promedio: number, cantidad: number };
}

export interface UserVideoGame {
  id: number;
  createdAt: string;
  deletedAt: string;
  fechaCompra: string;
  precio: number;
  videoGame: VideoGame;
}