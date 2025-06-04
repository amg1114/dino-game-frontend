import { VideoGame } from './video-game.interface';

export interface Categoria {
  id: number;
  titulo: string;
  descripcion: string;
  slug: string;
  videoGames?: VideoGame[];
}
