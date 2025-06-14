import { Modal } from '../../components/Modal';
import { StyledInput } from '../../components/forms/StyledInput';
import { usePasswordReset } from './hooks/usePasswordReset';

export function PasswordReset() {
  const {
    data,
    confirmPassword,
    errorPassword,
    errorConfirmPassword,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleSubmit,
    navigate,
  } = usePasswordReset();

  return (
    <>
      <Modal onClose={() => navigate('/')} modalTitle="Recuperar contraseña" size="sm" modalId="passwordRecovery">
        <form className="mt-4 flex flex-col gap-4 px-4">
          <StyledInput
            id="password"
            type="password"
            placeholder="*********"
            value={data.newPassword}
            onChange={handleChangePassword}
            label="Nueva contraseña"
            errors={errorPassword ? [errorPassword] : []}
          />
          <StyledInput
            id="confirm-password"
            type="password"
            placeholder="*********"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            label="Confirmar contraseña"
            errors={errorConfirmPassword ? [errorConfirmPassword] : []}
          />
          <div className="flex w-full flex-col items-center justify-center gap-1 p-4">
            <button className="primary-button w-full sm:w-auto" onClick={handleSubmit}>
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
