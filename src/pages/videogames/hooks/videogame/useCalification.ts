import axios from 'axios';
import { VideoGame } from '../../../../models/video-game.interface';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { UserCalificacion } from '../../../../models/user-calificacion.interface';

export function useCalification(game: VideoGame) {
  const { slug } = useParams();
  const [calification, setCalification] = useState<number>(0);
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [exists, setExists] = useState<boolean>(false);
  const [prevCalification, setPrevCalification] = useState<UserCalificacion | null>(null);

  const postData = async (value: number) => {
    axios
      .post('/api/video-games/' + slug, { puntaje: value })
      .then((r) => {
        setCalification(value);
        const newCalification: UserCalificacion = {
          calificacionID: r.data.id,
          videoGameID: game.id,
          calificacion: value,
        };
        setPrevCalification(newCalification);
        setExists(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const patchData = async (value: number, calificacion: UserCalificacion) => {
    axios
      .patch(`/api/video-games/${slug}/${calificacion.calificacionID}`, { puntaje: value })
      .then(() => {
        setCalification(value);
        setExists(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSetCalification = (value: number) => {
    if (!usuario) {
      navigate('/iniciar-sesion');
      return;
    }
    if (usuario.tipo !== 'ESTANDAR') {
      console.error('Solo los usuarios estandar pueden calificar');
      return;
    }
    if (!exists) {
      postData(value);
    } else {
      patchData(value, prevCalification!);
    }
  };

  useEffect(() => {
    if (usuario && usuario.calificaciones) {
      const calificacion = usuario.calificaciones.find((calif) => calif.videoGameID === game.id);
      if (calificacion) {
        setCalification(Number(calificacion.calificacion));
        setPrevCalification(calificacion);
        setExists(true);
        return;
      } else {
        setCalification(Math.round(Number(game.calificaciones.promedio)));
        setExists(false);
      }
    } else {
      setCalification(Math.round(Number(game.calificaciones.promedio)));
      setExists(false);
    }
  }, [game, usuario]);

  return {
    calification,
    handleSetCalification,
    usuario,
  };
}
