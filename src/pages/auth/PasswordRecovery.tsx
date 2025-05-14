import { useNavigate } from 'react-router';
import { Modal } from '../../components/Modal';
import { StyledInput } from '../../components/forms/StyledInput';
import { usePasswordRecovery } from './hooks/usePasswordRecovery';

export function PasswordRecovery() {
  const {
    correo,
    errorCorreo,
    isLoadingPetition,
    handleChangeCorreo,
    handleSubmit,
  } = usePasswordRecovery();

  const navigate = useNavigate();

  const onclose = (): void => {
    setTimeout(() => {
      navigate('/');
    }, 800);
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
            errors={errorCorreo ? [errorCorreo] : []}
          />
          <div className="flex w-full flex-col items-center justify-center gap-1 p-4">
            <button className="primary-button w-full sm:w-auto" onClick={handleSubmit} disabled={isLoadingPetition}>
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
    </>
  );
}
