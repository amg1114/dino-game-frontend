import axios from 'axios';
import { useEffect, useState } from 'react';
import { VideoGame } from '../../../models/video-game.interface';
import { Categoria } from '../../../models/categoria.interface';
import { Post } from '../../../models/post.interface';

export interface SectionData<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useHomePage() {
  const [featuredGames, setFeaturedGames] = useState<SectionData<VideoGame>>({
    data: [],
    loading: true,
    error: null,
  });

  const [blogPosts, setBlogPosts] = useState<SectionData<Post>>({
    data: [],
    loading: true,
    error: null,
  });

  const [freeGames, setFreeGames] = useState<SectionData<VideoGame>>({
    data: [],
    loading: true,
    error: null,
  });

  const [paidGames, setPaidGames] = useState<SectionData<VideoGame>>({
    data: [],
    loading: true,
    error: null,
  });

  const [discountedGames, setDiscountedGames] = useState<SectionData<VideoGame>>({
    data: [],
    loading: true,
    error: null,
  });

  const [categories, setCategories] = useState<SectionData<Categoria>>({
    data: [],
    loading: true,
    error: null,
  });

  const fetchData = async <T>(url: string, setter: React.Dispatch<React.SetStateAction<SectionData<T>>>) => {
    try {
      const response = await axios.get<SectionData<T>>(url);
      setter({
        data: response.data.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setter({
        data: [],
        loading: false,
        error: axios.isAxiosError(error) && error.message ? error.message : 'Error fetching data',
      });
    }
  };

  useEffect(() => {
    fetchData<VideoGame>(
      import.meta.env.VITE_API_URL + '/api/video-games?&orderBy=fechaLanzamiento&order=DESC&limit=4',
      setFeaturedGames
    );
    fetchData<VideoGame>(
      import.meta.env.VITE_API_URL + '/api/video-games?precio=0&orderBy=featured&order=DESC&limit=7',
      setFreeGames
    );
    fetchData<VideoGame>(
      import.meta.env.VITE_API_URL +
        '/api/video-games?onlyPaidGames=true&descuentos=false&orderBy=featured&order=DESC&limit=7',
      setPaidGames
    );
    fetchData<VideoGame>(
      import.meta.env.VITE_API_URL + '/api/video-games?descuentos=true&orderBy=featured&order=DESC&limit=3',
      setDiscountedGames
    );
    fetchData<Categoria>(import.meta.env.VITE_API_URL + '/api/categorias?limit=8', setCategories);
    fetchData<Post>(import.meta.env.VITE_API_URL + '/api/noticias?limit=3&order=DESC&orderBy=fecha', setBlogPosts);
  }, []);

  return {
    featuredGames,
    blogPosts,
    freeGames,
    paidGames,
    discountedGames,
    categories,
  };
}
