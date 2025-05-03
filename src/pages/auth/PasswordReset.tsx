import { useNavigate, useParams } from 'react-router';
import { Modal } from '../../components/Modal';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { StyledInput } from '../../components/StyledInput';
import { z } from 'zod';
import axios from 'axios';

export default function PasswordReset() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { usuario, isLoading, updateToken } = useAuth();
  const [data, setData] = useState({
    token: '',
    newPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);

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
        setErrorModal('Las contraseñas no coinciden');
        return;
      }
      z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').parse(data.newPassword);
      z.string().min(1, 'El token es requerido').parse(token);

      await axios
        .post(ENDPOINT, { token, newPassword: data.newPassword })
        .then((r) => {
          setSuccessModal(true);
          updateToken(r.data.access_token);
          setErrorModal(null);
        })
        .catch((error) => {
          setErrorModal(error.response?.data?.message || 'Error al cambiar la contraseña');
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorModal(error.errors[0].message);
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
      {errorModal && (
        <Modal onClose={() => setErrorModal(null)} modalTitle="Error" size="xs" modalId="error-modal">
          <p className="text-red">{errorModal}</p>
        </Modal>
      )}
      {successModal && (
        <Modal onClose={() => setSuccessModal(false)} modalTitle="Éxito" size="xs" modalId="success-modal">
          <p className="text-green">Contraseña actualizada con éxito</p>
        </Modal>
      )}
    </>
  );
}
