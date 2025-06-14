import { useEffect, useState } from 'react';
import { VideoGame } from '../../../models/video-game.interface';
import axios from 'axios';
import { usePagination } from '../../../hooks/usePagination';

export interface FetchResponse<T> {
  data: T[];
}

export function useCategoria(slug: string) {
  const [data, setData] = useState<VideoGame[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 768 }], 9);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`/api/video-games?categoria=${slug}&limit=${itemsPerPage}&offset=${page}`)
      .then(function (resp) {
        const data = resp.data.data;
        setData(data);
        setLoading(false);
        setTotalItems(resp.data.total);
      })
      .catch(function (err) {
        console.error(err);
        setError(err.response.data.message);
        setLoading(false);
      });

    axios
      .get(`/api/categorias/${slug}`)
      .then(function (resp) {
        const data = resp.data;
        setCategoria(data.titulo);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [slug, page, itemsPerPage]);

  return { data, categoria, loading, error, itemsPerPage, totalItems, page, setPage };
}
