import { GamePageContext } from '@utils/context/gamePageContext';
import { useContext } from 'react';

export function useGamePageContext() {
  const context = useContext(GamePageContext);
  if (!context) {
    throw new Error('useGamePageContext must be used within a GamePageContextProvider');
  }
  return context;
}
