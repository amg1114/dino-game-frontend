import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../../hooks/useAlert';
import axios from 'axios';
import { z } from 'zod';
import { SolicitudDesarrollador } from '../../../models/solicitud.interface';

export interface EstadoSolicitudDesarrollador {
  data: null | SolicitudDesarrollador;
  fetched: boolean;
}

const messageSchema = z.object({
  message: z.string().min(1, 'El mensaje es requerido'),
});

export function useSolicitudDesarrollador() {
  const { usuario } = useAuth();
  const { showAlert, showToast } = useAlert();
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [solicitud, setSolicitud] = useState<EstadoSolicitudDesarrollador>({
    data: null,
    fetched: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    try {
      messageSchema.parse({ message: event.target.value });
      setErrors([]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        setErrors(errorMessages);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errors.length === 0) {
      const loading = showAlert({
        title: 'Cargando',
        message: 'Enviando tu solicitud',
        type: 'loading',
      });

      axios
        .post<SolicitudDesarrollador>(`/api/users/developers/${usuario?.id}/solicitud`, {
          titulo: 'Solicitud de desarrollador - ' + usuario?.nombre,
          mensaje: message,
        })
        .then((res) => {
          setSolicitud({
            data: res.data,
            fetched: true,
          });

          showToast({
            message: 'Tu solicitud ha sido enviada correctamente',
            type: 'success',
          });
        })
        .catch((error) => {
          console.error(error);
          showAlert({
            title: 'Error',
            message: 'Error al enviar la solicitud',
            type: 'error',
          });
        })
        .finally(() => {
          loading.close();
        });
    }

    if (errors.length > 0) {
      showAlert({
        title: 'Error',
        message: 'Por favor, corrige los errores antes de enviar la solicitud',
        type: 'error',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    const getSolicitud = async () => {
      if (usuario) {
        const loading = showAlert({
          title: 'Cargando',
          message: 'Cargando tu solicitud',
          type: 'loading',
        });

        axios
          .get(`/api/users/developers/${usuario.id}/solicitud`)
          .then((response) => {
            setSolicitud({
              data: response.data,
              fetched: true,
            });
          })
          .catch((error) => {
            console.error(error);
            showAlert({
              title: 'Error',
              message: 'Error al cargar la solicitud',
              type: 'error',
            });
          })
          .finally(() => {
            loading.close();
            solicitud.fetched = true;
          });
      }
    };

    if (usuario && !solicitud.fetched) {
      getSolicitud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario, solicitud]);

  return { solicitud, message, errors, handleChange, handleSubmit };
}
