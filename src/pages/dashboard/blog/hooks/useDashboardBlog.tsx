import { useAuth } from '@hooks/useAuth';
import { usePagination } from '@hooks/usePagination';
import { PaginatedResponse } from '@models/base-fetch.interface';
import { Post } from '@models/post.interface';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useDashboardBlog() {
  const { usuario } = useAuth();

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
  };
}
