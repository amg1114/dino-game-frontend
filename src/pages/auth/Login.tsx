import { Link, useNavigate } from 'react-router';
import { Modal } from '../../components/Modal';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { StyledInput } from '../../components/forms/StyledInput';
import { useAlert } from '../../hooks/useAlert';
import { loginSchema } from '../../utils/zod/user.validators';

export function Login() {
  const ENDPOINT = '/api/auth/login';
  const { usuario, logIn, isLoading } = useAuth();
  const { showToast } = useAlert();
  const [data, setData] = useState({
    correo: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const navigate = useNavigate();
  const onclose = (): void => {
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  useEffect(() => {
    if (!isLoading && usuario) {
      navigate('/');
    }
  }, [usuario, isLoading, navigate]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse(data);
      axios
        .post(ENDPOINT, data)
        .then((response) => {
          logIn(response.data.access_token);
          showToast({
            type: 'success',
            message: 'Inicio de sesión exitoso',
            duration: 2000,
          });
          onclose();
        })
        .catch((e) => {
          showToast({
            type: 'error',
            message: e.response.data.message,
            duration: 2000,
          });
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast({
          type: 'error',
          message: error.errors[0].message,
          duration: 2000,
        });
      }
    }
  };

  return (
    <>
      <Modal onClose={onclose} modalTitle="INICIAR SESIÓN" size="sm" modalId="login-modal">
        <form className="mt-4 flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-7">
            <StyledInput
              id="correo"
              type="text"
              placeholder="jhondoe@example.com"
              value={data.correo}
              onChange={handleChange}
              label="Correo electrónico"
            />
            <StyledInput
              id="password"
              type="password"
              placeholder="*********"
              value={data.password}
              onChange={handleChange}
              label="Contraseña"
            />
          </div>
          <div className="flex justify-end">
            <Link to={'/recuperar-contrasena'} className="text-green hover:text-green-light cursor-pointer text-sm">
              Olvide mi contraseña
            </Link>
          </div>
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-1 p-4">
            <button type="submit" className="primary-button w-full sm:w-auto" onClick={login}>
              INICIAR SESIÓN
            </button>
            <button
              type="button"
              className="w-full cursor-pointer rounded p-2 text-white hover:underline sm:w-auto"
              onClick={() => navigate('/registro')}
            >
              Registrarse
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
