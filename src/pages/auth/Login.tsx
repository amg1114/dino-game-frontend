import { Link } from 'react-router';
import { Modal } from '../../components/Modal';
import { StyledInput } from '../../components/forms/StyledInput';
import { useLogin } from './hooks/useLogin';

export function Login() {
  const { data, errorCorreo, errorPassword, handleChange, login, navigate } = useLogin();

  return (
    <>
      <Modal onClose={() => navigate('/')} modalTitle="INICIAR SESIÓN" size="sm" modalId="login-modal">
        <form className="mt-4 flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-7">
            <StyledInput
              id="correo"
              type="text"
              placeholder="jhondoe@example.com"
              value={data.correo}
              onChange={handleChange}
              label="Correo electrónico"
              errors={errorCorreo ? [errorCorreo] : []}
            />
            <StyledInput
              id="password"
              type="password"
              placeholder="*********"
              value={data.password}
              onChange={handleChange}
              label="Contraseña"
              errors={errorPassword ? [errorPassword] : []}
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
