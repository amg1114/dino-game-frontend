import { VideoGame } from './video-game.interface';

export interface Categoria {
  id: number;
  titulo: string;
  descripcion: null;
  slug: string;
  videoGames?: VideoGame[];
}
