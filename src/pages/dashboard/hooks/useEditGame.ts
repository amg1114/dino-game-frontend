import axios from 'axios';

import { VideoGame } from '@models/video-game.interface';
import { useEffect, useState } from 'react';
import { useGameForm } from './useGameForm';

export function useEditGame(slug: string) {
  const [fetchedGame, setFetchedGame] = useState<VideoGame | null>(null);
  const editForm = useGameForm('edit', fetchedGame, setFetchedGame);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get<VideoGame>(`${import.meta.env.VITE_API_URL}/api/video-games/${slug}`);
        setFetchedGame(res.data);
      } catch (error) {
        console.error('Error fetching game:', error);
        throw new Error('Failed to fetch game data');
      }
    };

    fetchGame();
  }, [slug]);

  return {
    editForm,
    fetchedGame,
  };
}
