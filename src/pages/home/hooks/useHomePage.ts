import axios from 'axios';
import { useEffect, useState } from 'react';
import { VideoGame } from '../../../models/video-game.interface';
import { Categoria } from '../../../models/categoria.interface';
import { BaseFetch } from '../../../models/base-fetch.interface';
import { News } from '../../../models/news.interface';

export interface FetchResponse<T> extends BaseFetch {
  data: T[];
}

export interface SectionData<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useHomePage() {
  const [blogNews, setBlogNews] = useState<SectionData<News>>({
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
    fetchData<VideoGame>('/api/video-games?precio=0&orderBy=featured&order=DESC&limit=7', setFreeGames);
    fetchData<VideoGame>(
      '/api/video-games?onlyPaidGames=true&descuentos=false&orderBy=featured&order=DESC&limit=7',
      setPaidGames
    );
    fetchData<VideoGame>('/api/video-games?descuentos=true&orderBy=featured&order=DESC&limit=3', setDiscountedGames);
    fetchData<Categoria>('/api/categorias?limit=8', setCategories);
    fetchData<News>('/api/noticias?limit=3&order=DESC&orderBy=fecha', setBlogNews);
  }, []);

  return {
    blogNews,
    freeGames,
    paidGames,
    discountedGames,
    categories,
  };
}
