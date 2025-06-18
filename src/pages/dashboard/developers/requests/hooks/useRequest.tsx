import { useEffect, useState } from 'react';
import { usePagination } from '../../../../../hooks/usePagination';
import axios from 'axios';
import { SolicitudDesarrollador } from '../../../../../models/solicitud.interface';
import { number } from 'zod';
import { useAlert } from '../../../../../hooks/useAlert';

interface returnedRequest {
  request: SolicitudDesarrollador[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}
export function useRequest(): returnedRequest & { refetch: () => void } {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SolicitudDesarrollador[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 760 }], 12);

  const fetchRequest = () => {
    setLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/users/developers/solicitudes?limit=${itemsPerPage}&offset=${page}&orderBy=fecha&order=DESC`
      )
      .then((resp) => {
        const respRequest = resp.data.data.filter((req: SolicitudDesarrollador) => req.estado === 'PENDING');
        setData(respRequest);
        setTotalItems(resp.data.total);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        console.log('error de axios en la request->', e.response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequest();
  }, [page, itemsPerPage]);

  return { request: data, loading, page, setPage, totalItems, itemsPerPage, refetch: fetchRequest };
}

interface returnedSearch {
  query: string;
  setQuery: (query: string) => void;
  result: SolicitudDesarrollador[];
}
export function useSearch(): returnedSearch {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/developers/solicitudes?search=${query}`)
      .then((resp) => {
        console.log('queryyy', query);
        const respRequest = resp.data.data.filter((req: SolicitudDesarrollador) => req.estado === 'PENDING');
        setResult(respRequest);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [query]);

  return { query, setQuery, result };
}

export function useGetRequest(id: string) {
  const [data, setData] = useState({
    idReq: number,
    titulo: '',
    mensaje: '',
    estado: '',
  });
  const { showAlert } = useAlert();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/developers/${id}/solicitud`)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((e) => {
        console.error(e);
        showAlert({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los datos de la solicitud.',
          duration: 2000,
        });
      });
  }, [id]);

  console.log('datos request dev...: ', data);
  return { data, setData };
}
