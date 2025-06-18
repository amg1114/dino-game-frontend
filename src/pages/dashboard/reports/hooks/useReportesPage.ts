import axios from 'axios';
import { useEffect, useState } from 'react';
import { Report } from '../../../../models/report.interface';
import { usePagination } from '../../../../hooks/usePagination';

export interface FetchResponse<T> {
  data: T[];
}

export function useReportesPage() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 768 }], 15);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/reports?limit=${itemsPerPage}&offset=${page}&search=${search}`)
      .then(function (resp) {
        const data = resp.data.data;
        console.log(data);
        console.log('este es el search: ' + search);
        setData(data);
        setLoading(false);
        setTotalItems(resp.data.total);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, itemsPerPage, search]);

  return {
    data,
    loading,
    error,
    itemsPerPage,
    totalItems,
    page,
    setPage,
    search,
    setSearch,
    refetch: fetchData,
  };
}
