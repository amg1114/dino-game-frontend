import { useAlert } from '@hooks/useAlert';
import { useAuth } from '@hooks/useAuth';
import { usePagination } from '@hooks/usePagination';
import { PaginatedResponse } from '@models/base-fetch.interface';
import { Post } from '@models/post.interface';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useDashboardBlog() {
  const { usuario } = useAuth();
  const { showAlert, showToast } = useAlert();

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { itemsPerPage, page, setPage } = usePagination(
    [
      {
        itemsPerPage: 4,
        windowWidth: 768,
      },
    ],
    9
  );

  const fetchPosts = useCallback(async () => {
    if (!usuario) return;
    let endpoint = `/api/noticias?limit=${itemsPerPage}&offset=${page}&autor=${usuario.id}&orderBy=fecha&order=desc`;

    if (searchTerm.trim() !== '') {
      endpoint += `&search=${searchTerm}`;
    }

    const response = await axios.get<PaginatedResponse<Post>>(endpoint);

    try {
      setPosts(response.data.data);
      setTotalPosts(response.data.total);
    } catch (error) {
      setPosts([]);
      setTotalPosts(0);
      console.error('Error fetching posts:', error);
    }
  }, [usuario, searchTerm, itemsPerPage, page]);

  const handleDeletePost = (post: Post) => {
    showAlert({
      type: 'warning',
      title: 'Eliminar Publicación',
      message: `¿Estás seguro de que quieres eliminar la publicación "${post.titulo}"? Esta acción no se puede deshacer.`,
      isConfirm: true,
      onClose(confirm) {
        if (!confirm) {
          showToast({
            type: 'info',
            message: 'La publicación no fue eliminada.',
          });
          return;
        }

        deletePost(post.id);
      },
    });
  };

  const deletePost = async (id: number) => {
    const loading = showAlert({
      type: 'loading',
      title: 'Eliminando Publicación',
      message: 'Por favor, espere mientras se elimina la publicación.',
    });

    try {
      await axios.delete(`/api/noticias/${id}`);
      showToast({
        type: 'success',
        message: 'Publicación eliminada correctamente.',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      showAlert({
        type: 'error',
        title: 'Error al eliminar la publicación',
        message: 'Ocurrió un error al intentar eliminar la publicación. Por favor, inténtalo de nuevo más tarde.',
      });
    } finally {
      loading.close();
      fetchPosts();
    }
  };
  useEffect(() => {
    if (usuario) {
      fetchPosts();
    }
  }, [usuario, fetchPosts]);

  return {
    posts,
    totalPosts,
    itemsPerPage,
    page,
    searchTerm,
    setSearchTerm,
    setPage,
    fetchPosts,
    handleDeletePost,
  };
}
