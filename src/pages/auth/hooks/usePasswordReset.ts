import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../../hooks/useAlert';
import { passwordResetSchema } from '../../../utils/zod/user.validators';

export function usePasswordReset() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { showToast, showAlert } = useAlert();
  const { usuario, isLoading } = useAuth();

  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
  const [data, setData] = useState({
    token: '',
    newPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [touched, setTouched] = useState({ newPassword: false, confirmPassword: false });

  const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/auth/reset-password`;

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, newPassword: value }));
    setTouched((prev) => ({ ...prev, newPassword: true }));
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (data.newPassword !== confirmPassword) {
        setErrorConfirmPassword('Las contraseñas no coinciden');
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
          setTimeout(() => {
            navigate('/iniciar-sesion');
          }, 2000);
        })
        .catch((error) => {
          showAlert({
            type: 'error',
            title: 'Error',
            message: error.response.data.message || 'Error al actualizar la contraseña',
            isConfirm: false,
            duration: 2000,
          });
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorPassword(error.errors[0].message);
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

  useEffect(() => {
    if (data.newPassword.length === 0) {
      setErrorPassword('');
    } else {
      try {
        passwordResetSchema.parse(data);
        setErrorPassword('');
      } catch (error) {
        if (error instanceof z.ZodError && touched.newPassword) {
          setErrorPassword(error.errors[0]?.message || 'Error en la contraseña');
        }
      }
    }
    if (confirmPassword.length === 0) {
      setErrorConfirmPassword('');
    } else if (data.newPassword !== confirmPassword && touched.confirmPassword) {
      setErrorConfirmPassword('Las contraseñas no coinciden');
    } else if (data.newPassword === confirmPassword) {
      setErrorConfirmPassword('');
    }
  }, [data, confirmPassword, touched]);

  return {
    data,
    confirmPassword,
    errorPassword,
    errorConfirmPassword,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleSubmit,
    navigate,
  };
}
