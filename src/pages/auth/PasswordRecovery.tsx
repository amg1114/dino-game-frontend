import { useNavigate } from 'react-router';
import { Modal } from '../../components/Modal';
import { StyledInput } from '../../components/forms/StyledInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { emailSchema } from '../../utils/zod/user.validators';

export function PasswordRecovery() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState<string>('');
  const { usuario, isLoading } = useAuth();
  const { showToast } = useAlert();

  //para preguntar
  const [isLoadingPetition, setIsLoadingPetition] = useState(false);

  const handleChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCorreo(value);
  };

  const onclose = (): void => {
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  useEffect(() => {
    if (usuario && !isLoading) {
      navigate('/');
    }
  }, [usuario, isLoading, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse(correo);
      setIsLoadingPetition(true);

      axios
        .post(`/api/auth/request-password-reset?email=${correo}`)
        .then(() => {
          showToast({
            type: 'success',
            message: 'Se ha enviado un enlace de recuperación a su correo',
            duration: 2000,
          });
          setIsLoadingPetition(false);
          setTimeout(() => {
            navigate('/iniciar-sesion');
          }, 3000);
        })
        .catch((error) => {
          showToast({
            type: 'error',
            message: error.response.data.message,
            duration: 2000,
          });
          setIsLoadingPetition(false);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast({
          type: 'error',
          message: error.errors[0].message,
          duration: 2000,
        });
      }
      setIsLoadingPetition(false);
    }
  };

  return (
    <>
      <Modal onClose={onclose} modalTitle="Recuperar contraseña" size="sm" modalId="passwordRecovery">
        <form className="mt-4 flex flex-col gap-4 px-4">
          <StyledInput
            id="correo"
            type="text"
            placeholder="jhondoe@example.com"
            value={correo}
            onChange={handleChangeCorreo}
            label="Correo electrónico"
          />
          <div className="flex w-full flex-col items-center justify-center gap-1 p-4">
            <button className="primary-button w-full sm:w-auto" onClick={handleSubmit}>
              Enviar
            </button>
            <button
              type="button"
              className="w-full cursor-pointer rounded p-2 text-white hover:underline sm:w-auto"
              onClick={() => navigate('/iniciar-sesion')}
            >
              Ya tengo una cuenta
            </button>
            <button
              type="button"
              className="w-full cursor-pointer rounded p-2 text-white hover:underline sm:w-auto"
              onClick={() => navigate('/registro')}
            >
              Crear una cuenta
            </button>
          </div>
        </form>
      </Modal>
      {isLoadingPetition && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}
    </>
  );
}
