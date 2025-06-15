import { VideoGame } from './video-game.interface';

export interface Descuento {
  id: number;
  porcentaje: number;
  videoGame: VideoGame;
  fechaInicio: Date;
  fechaFin: Date;
}
