import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { UserVideoGame } from '../../../models/video-game.interface';
import axios from 'axios';
import { usePagination } from '../../../hooks/usePagination';

export function useLibrary() {
  const { usuario } = useAuth();
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 768 }], 9);
  const [videoGames, setVideoGames] = useState<UserVideoGame[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchVideoGames = useCallback(async () => {
    if (usuario) {
      try {
        const res = await axios.get(`/api/video-games/biblioteca?limit=${itemsPerPage}&offset=${page}`);
        setVideoGames(res.data.data);
        setTotalItems(res.data.total);
      } catch (error) {
        console.error('Error fetching video games:', error);
      }
    }
  }, [usuario, page, itemsPerPage]);

  useEffect(() => {
    if (usuario) {
      fetchVideoGames();
    }
    fetchVideoGames();
  }, [usuario, page, itemsPerPage, fetchVideoGames]);

  return { usuario, videoGames, itemsPerPage, totalItems, page, setPage, fetchVideoGames };
}
