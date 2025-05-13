import { useNavigate, useParams } from 'react-router';
import { Modal } from '../../components/Modal';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { StyledInput } from '../../components/forms/StyledInput';
import { z } from 'zod';
import axios from 'axios';
import { passwordResetSchema } from '../../utils/zod/user.validators';
import { useAlert } from '../../hooks/useAlert';

export function PasswordReset() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { showToast } = useAlert();
  const { usuario, isLoading } = useAuth();
  const [data, setData] = useState({
    token: '',
    newPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const ENDPOINT = `/api/auth/reset-password`;

  const onclose = (): void => {
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, newPassword: value }));
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (data.newPassword !== confirmPassword) {
        showToast({
          type: 'error',
          message: 'Las contraseñas no coinciden',
          duration: 2000,
        });
        return;
      }
      passwordResetSchema.parse(data);
      await axios
        .post(ENDPOINT, { token, newPassword: data.newPassword })
        .then(() => {
          showToast({
            type: 'success',
            message: 'Contraseña actualizada con éxito',
            duration: 2000,
          });
          setData({ token: '', newPassword: '' });
          setConfirmPassword('');
          onclose();
        })
        .catch((error) => {
          showToast({
            type: 'error',
            message: error.response.data.message,
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

  useEffect(() => {
    if (usuario && !isLoading) {
      navigate('/');
    }
    if (token) {
      setData((prev) => ({ ...prev, token }));
    }
  }, [usuario, isLoading, token, navigate]);

  return (
    <>
      <Modal onClose={onclose} modalTitle="Recuperar contraseña" size="sm" modalId="passwordRecovery">
        <form className="mt-4 flex flex-col gap-4 px-4">
          <StyledInput
            id="password"
            type="password"
            placeholder="*********"
            value={data.newPassword}
            onChange={handleChangePassword}
            label="Nueva contraseña"
          />
          <StyledInput
            id="confirm-password"
            type="password"
            placeholder="*********"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            label="Confirmar contraseña"
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
