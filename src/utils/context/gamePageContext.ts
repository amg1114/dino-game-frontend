import { VideoGame } from '@models/video-game.interface';
import { createContext } from 'react';

export interface GamePageContextType {
  game: VideoGame | null;
  setGame?: (game: VideoGame | null) => void;
}
export const GamePageContext = createContext<GamePageContextType | undefined>(undefined);
