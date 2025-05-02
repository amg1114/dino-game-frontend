import { Link, useNavigate } from 'react-router';
import { Modal } from '../../components/Modal';
import { useAuth } from '../../providers/AuthContext';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { StyledInput } from '../../components/StyledInput';

const schema = z.object({
  correo: z.string().email('Correo electrónico inválido'),
});

export function Login() {
  const ENDPOINT = '/api/auth/login';
  const { usuario, updateToken, isLoading } = useAuth();
  const [data, setData] = useState({
    correo: '',
    password: '',
  });
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);

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
    if (errorModal) {
      setTimeout(() => {
        setErrorModal(null);
      }, 3000);
    }
    if (successModal) {
      setTimeout(() => {
        setSuccessModal(false);
        navigate('/');
      }, 3000);
    }
  }, [usuario, isLoading, errorModal, successModal]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(data);
      axios
        .post(ENDPOINT, data)
        .then((response) => {
          updateToken(response.data.access_token);
          setSuccessModal(true);
        })
        .catch((e) => {
          setErrorModal(e.response.data.message);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorModal(error.errors[0].message);
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
            <Link to={"/recuperar-contraseña"} className="text-green hover:text-green-light cursor-pointer text-sm">Olvide mi contraseña</Link>
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
      {errorModal && (
        <Modal onClose={() => setErrorModal(null)} modalTitle="Error" size="xs" modalId="error-modal">
          <p className="text-red">{errorModal}</p>
        </Modal>
      )}
      {successModal && (
        <Modal onClose={() => setSuccessModal(false)} modalTitle="Éxito" size="xs" modalId="success-modal">
          <p className="text-green">Inicio de sesión exitoso</p>
        </Modal>
      )}
    </>
  );
}
