import axios from 'axios';
import { useEffect, useState } from 'react';
import { VideoGamesFetchResponse } from '../interfaces/games-fetch.interface';
import { VideoGame } from '../../../models/video-game.interface';

export interface HomeSectionData {
  data: VideoGame[];
  loading: boolean;
  error: string | null;
}

export function useHomePage() {
  const [freeGames, setFreeGames] = useState<HomeSectionData>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchFreeGames = () => {
      axios
        .get<VideoGamesFetchResponse>('/api/video-games?precio=0&orderBy=featured&order=DESC')
        .then((response) => {
          const data = response.data;
          setFreeGames({
            data: data.data,
            loading: false,
            error: null,
          });
        })
        .catch((error) => {
          setFreeGames({
            data: [],
            loading: false,
            error: error.message,
          });
        });
    };

    fetchFreeGames();
  }, []);

  return {
    freeGames,
  };
}
