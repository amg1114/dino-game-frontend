import { Usuario } from './user.interface';
import { VideoGame } from './video-game.interface';

export interface TypeReport {
  id: number;
  createdAt: Date;
  deletedAt: null;
  description: string;
  title: string;
}

export interface Report {
  id: number;
  createdAt: Date;
  deletedAt: null;
  state: string;
  typeReport?: TypeReport;
  user?: Usuario;
  videoGame?: VideoGame;
}
