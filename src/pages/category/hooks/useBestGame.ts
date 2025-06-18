import { useEffect, useState } from 'react';
import { VideoGame } from '../../../models/video-game.interface';
import axios from 'axios';

interface BestGame {
  game: VideoGame | null;
  loading: boolean;
}

export const useBestGame = (slug: string): BestGame => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/calificaciones/best-video-game/${slug}`)
      .then((resp) => {
        const game_data = resp.data;
        setGame(game_data);
        setLoading(false);
      })
      .catch(function (err) {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  return { game: game, loading };
};
