import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../../../hooks/useAuth';
import { VideoGame } from '../../../../models/video-game.interface';
import { usePagination } from '../../../../hooks/usePagination';
import { useAlert } from '../../../../hooks/useAlert';

export interface AdminPermissions {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAddDiscounts: boolean;
}

export function useDashboardGames() {
  const { usuario } = useAuth();
  const { showAlert, showToast } = useAlert();

  const [games, setGames] = useState<VideoGame[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [permissions, setPermissions] = useState<AdminPermissions>({
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canAddDiscounts: false,
  });

  const { itemsPerPage, page, setPage } = usePagination(
    [
      {
        itemsPerPage: 4,
        windowWidth: 768,
      },
    ],
    9
  );

  const fetchGames = useCallback(async () => {
    if (!usuario) return;

    let endpoint = `${import.meta.env.VITE_API_URL}/api/video-games?limit=${itemsPerPage}&offset=${page}`;

    if (usuario.tipo === 'DEVELOPER') {
      endpoint += `&developer=${usuario.id}`;
    }

    if (searchTerm) {
      endpoint += `&search=${searchTerm}`;
    }

    try {
      const response = await axios.get<{
        data: VideoGame[];
        total: number;
        offset: number;
      }>(endpoint);

      const data = response.data.data;
      setGames(data);
      setTotalGames(response.data.total);
    } catch (error) {
      setGames([]);
      setTotalGames(0);
      console.error('Error fetching games:', error);
    }
  }, [usuario, page, itemsPerPage, searchTerm]);

  const handleDelete = (videoGame: VideoGame) => {
    showAlert({
      type: 'warning',
      title: 'Eliminar Juego',
      message: `¿Estás seguro de que deseas eliminar el juego ${videoGame.titulo}? Sólo los administradores de la base de datos podran restaurar el juego.`,
      isConfirm: true,
      onClose(confirm) {
        if (confirm) {
          const loading = showAlert({
            type: 'loading',
            title: 'Eliminando juego',
            message: `Eliminando el juego ${videoGame.titulo}...`,
          });

          axios
            .delete(`${import.meta.env.VITE_API_URL}/api/video-games/${videoGame.id}`)
            .then(() => {
              fetchGames();
              showToast({
                type: 'info',
                message: `El juego ${videoGame.titulo} ha sido eliminado.`,
              });
            })
            .catch((error) => {
              console.error('Error deleting game:', error);
              showAlert({
                type: 'error',
                title: 'Error al eliminar el juego',
                message: `No se pudo eliminar el juego ${videoGame.titulo}. Por favor, inténtalo de nuevo más tarde.`,
                duration: 2200,
              });
            })
            .finally(() => {
              loading.close();
            });

          return;
        }

        showToast({
          type: 'info',
          message: `El juego ${videoGame.titulo} no ha sido eliminado.`,
        });
      },
    });
  };

  useEffect(() => {
    if (usuario) {
      fetchGames();

      setPermissions({
        canCreate: usuario.tipo === 'DEVELOPER',
        canEdit: usuario.tipo === 'DEVELOPER',
        canDelete: usuario.tipo === 'DEVELOPER' || usuario.tipo === 'ADMINISTRATOR',
        canAddDiscounts: usuario.tipo === 'DEVELOPER',
      });
    }
  }, [usuario, page, itemsPerPage, searchTerm, fetchGames]);

  return {
    permissions,
    games,
    totalGames,
    itemsPerPage,
    page,
    searchTerm,
    setPage,
    setSearchTerm,
    handleDelete,
  };
}
