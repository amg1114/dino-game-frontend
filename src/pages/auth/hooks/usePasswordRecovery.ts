import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../../hooks/useAlert';
import { emailSchema } from '../../../utils/zod/user.validators';

export function usePasswordRecovery() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState<string>('');
  const [errorCorreo, setErrorCorreo] = useState<string>('');
  const [isLoadingPetition, setIsLoadingPetition] = useState(false);
  const [touched, setTouched] = useState(false);
  const { usuario, isLoading } = useAuth();
  const { showToast, showAlert } = useAlert();

  const handleChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCorreo(value);
    setTouched(true);
  };

  useEffect(() => {
    if (correo.length === 0) {
      setErrorCorreo('');
      return;
    }
    try {
      emailSchema.parse(correo);
      setErrorCorreo('');
    } catch (error) {
      if (error instanceof z.ZodError && touched) {
        setErrorCorreo(error.issues[0]?.message || 'Error en el correo');
      }
    }
  }, [correo, touched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let mostrarAlerta: ReturnType<typeof showAlert> | null = null;

    try {
      emailSchema.parse(correo);
      setIsLoadingPetition(true);
      mostrarAlerta = showAlert({
        type: 'info',
        title: 'Enviando correo',
        message: 'Estamos enviando un enlace de recuperación a su correo',
        isConfirm: false,
      });
      setErrorCorreo('');

      axios
        .post(`${import.meta.env.VITE_API_URL}/api/auth/request-password-reset?email=${correo}`)
        .then(() => {
          if (mostrarAlerta) {
            mostrarAlerta.close();
          }
          showToast({
            type: 'success',
            message: 'Se ha enviado un enlace de recuperación a su correo',
            duration: 2000,
          });
          setIsLoadingPetition(false);
          setTimeout(() => {
            navigate('/iniciar-sesion');
          }, 2000);
        })
        .catch((error) => {
          if (mostrarAlerta) {
            mostrarAlerta.close();
          }
          const errorMessage = error.response?.data?.message || 'Error interno del servidor';
          setIsLoadingPetition(false);
          showAlert({
            type: 'error',
            title: 'Error',
            message: errorMessage,
            isConfirm: false,
            duration: 2000,
          });
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorCorreo(error.issues[0]?.message || 'Error en el correo');
      }
      setIsLoadingPetition(false);
    }
  };

  useEffect(() => {
    if (usuario && !isLoading) {
      navigate('/');
    }
    if (correo.length === 0) {
      setErrorCorreo('');
    }
  }, [usuario, isLoading, navigate, correo]);

  return {
    correo,
    errorCorreo,
    isLoadingPetition,
    handleChangeCorreo,
    handleSubmit,
    navigate,
  };
}
