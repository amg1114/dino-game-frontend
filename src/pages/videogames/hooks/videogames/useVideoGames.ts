import { useEffect, useState } from 'react';
import { VideoGame } from '../../../../models/video-game.interface';
import axios from 'axios';
import { usePagination } from '../../../../hooks/usePagination';

export function useVideoGames() {
  const [data, setData] = useState<VideoGame[]>([]);
  const [dataBySearch, setDataBySearch] = useState<VideoGame[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputPrice, setInputPrice] = useState<string>('');
  const [inputCategoria, setInputCategoria] = useState<string>('');
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 768 }], 9);

  useEffect(() => {
    let ENDPOINT = `${import.meta.env.VITE_API_URL}/api/video-games?limit=${itemsPerPage}&offset=${page}`;

    if (inputCategoria) {
      ENDPOINT += `&categoria=${inputCategoria}`;
    }
    const priceNumber = Number(inputPrice);
    if (inputPrice !== '' && !isNaN(priceNumber) && priceNumber > 0) {
      ENDPOINT += `&precio=${priceNumber}`;
    }

    setLoading(true);

    axios
      .get(ENDPOINT)
      .then((response) => {
        setData(response.data.data);
        setTotalItems(response.data.total);
      })
      .catch((error) => {
        setLoading(false);
        setData([]);
        console.error('Error fetching data:', error);
      });
  }, [page, itemsPerPage, inputPrice, inputCategoria]);

  useEffect(() => {
    if (inputTitle.length <= 0) {
      setDataBySearch([]);
      return;
    }
    const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/video-games?search=${inputTitle}`;
    setLoading(true);
    axios
      .get(ENDPOINT)
      .then((response) => {
        setDataBySearch(response.data.data);
      })
      .catch(() => {
        setLoading(false);
        setDataBySearch([]);
      });
  }, [inputTitle]);
  const handleInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputPrice(e.target.value);
  return {
    data,
    loading,
    itemsPerPage,
    page,
    dataBySearch,
    inputPrice,
    inputCategoria,
    inputTitle,
    setInputTitle,
    setInputPrice,
    setInputCategoria,
    setPage,
    setDataBySearch,
    handleInputPriceChange,
    totalItems,
  };
}
