import { useAlert } from '@hooks/useAlert';
import { useAuth } from '@hooks/useAuth';
import { PaginatedResponse } from '@models/base-fetch.interface';
import { TypeReport } from '@models/report.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function useReport(slug: string) {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  const [gameId, setGameId] = useState<number>(0);
  const [reportTypeSelected, setReportTypeSelected] = useState<TypeReport | null>(null);
  const [typeReportsData, setTypeReportsData] = useState<PaginatedResponse<TypeReport>>({
    data: [],
    total: 0,
    offset: 0,
  });
  const { usuario, token } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (usuario && usuario.tipo !== 'ESTANDAR') {
      navigate(`/juegos/${slug}`);
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + '/api/type-reports')
      .then((response) => {
        if (response.data.data.length != 0) {
          setTypeReportsData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching type reports:', error);
      });
  }, [usuario, token]);

  useEffect(() => {
    if (!slug) {
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/video-games/${slug}`)
      .then((response) => {
        const game = response.data;
        setGameId(game.id);
      })
      .catch((error) => {
        console.error('Error fetching video game data:', error);
      });
  }, [slug]);

  const handleReportSubmit = (reportType: number, id: number) => {
    if (!usuario || !token) {
      navigate('/iniciar-sesion');
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/reports/${id}`, { typeReportId: reportType })
      .then(() => {
        showAlert({
          type: 'success',
          title: 'Reporte Enviado',
          message: 'Reporte enviado exitosamente. Gracias por tu colaboración.',
          duration: 2000,
        });
        navigate(-1);
      })
      .catch((e) => {
        showAlert({
          type: 'error',
          title: 'Error al enviar el reporte',
          message:
            e.response?.data?.message ||
            'Ocurrió un error al enviar el reporte. Por favor, inténtalo de nuevo más tarde.',
          duration: 3000,
        });
      });
  };
  const handleReportTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    const foundType = typeReportsData.data.find((type) => type.id === Number(selectedType));
    if (foundType) {
      setReportTypeSelected(foundType);
    } else {
      setReportTypeSelected(null);
    }
  };

  return {
    handleClose,
    handleReportSubmit,
    typeReportsData,
    handleReportTypeChange,
    reportTypeSelected,
    gameId,
  };
}
