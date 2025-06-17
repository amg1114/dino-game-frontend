import axios from 'axios';
import { Descuento } from '../../../../../models/descuento.interface';
import { useEffect, useState } from 'react';

export function useDescuento(id: string | number | null) {
  const [data, setData] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ObtenerDescuentos = () => {
    axios
      .get(`/api/video-games/${id}/descuentos`)
      .then((res) => {
        const data = res.data;
        setError(null);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  useEffect(() => {
    ObtenerDescuentos();
  }, [id]);
  return { data, loading, error, ObtenerDescuentos };
}
