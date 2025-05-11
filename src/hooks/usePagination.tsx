import { useEffect, useState } from 'react';
import useWindowDimensions from './useWindowDimensions';

export interface PaginationConfig {
  itemsPerPage: number;
  windowWidth: number;
}

export function usePagination(confing: PaginationConfig[], defaultItemsPage: number) {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPage);
  const [page, setPage] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const config = confing.find((config) => width <= config.windowWidth);
    if (config) {
      setItemsPerPage(config.itemsPerPage);
    } else {
      setItemsPerPage(defaultItemsPage);
    }
  }, [width, confing, defaultItemsPage]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return {
    itemsPerPage,
    page,
    setPage,
  };
}
