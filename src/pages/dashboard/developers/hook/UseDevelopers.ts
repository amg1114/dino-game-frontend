import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePagination } from '../../../../hooks/usePagination';
import { Usuario } from '../../../../models/user.interface';

interface DeveloperReturn {
  desarrolladores: Usuario[];
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  loading: boolean;
}

export function useDevelopers(): DeveloperReturn {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 3, windowWidth: 760 }], 12);
  const endpoint = `${import.meta.env.VITE_API_URL}/api/users/developers?limit=${itemsPerPage}&offset=${page}`;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setDevelopers(response.data.data);
        setTotalItems(response.data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener desarrolladores:', error);
        setLoading(false);
      });
  }, [page, itemsPerPage]);
  return { desarrolladores: developers, page, setPage, itemsPerPage, totalItems, loading };
}
