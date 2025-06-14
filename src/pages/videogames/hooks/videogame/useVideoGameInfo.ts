import { useEffect, useState } from 'react';
import { VideoGame } from '../../../../models/video-game.interface';
import axios from 'axios';
import { useParams } from 'react-router';

export function useVideoGameInfo() {
  const { slug } = useParams();
  const [videoGame, setVideoGame] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/video-games/${slug}`);
      const game = response.data;
      game.assets = [...game.assets, game.thumb, game.hero];
      setVideoGame(game);
    } catch (error) {
      console.error('Error fetching video game data:', error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (!videoGame) return null;
  const game: VideoGame = videoGame;
  const fechaDeLanzamiento = new Date(game.fechaLanzamiento);
  const mes = fechaDeLanzamiento.toLocaleString('default', { month: 'long' });
  const dia = fechaDeLanzamiento.getDate();
  const anio = fechaDeLanzamiento.getFullYear();
  const fechaFormateada = `${mes} ${dia}, ${anio}`;

  return {
    game,
    fechaFormateada,
    fetchData,
  };
}
