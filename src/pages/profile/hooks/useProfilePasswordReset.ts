import { useEffect, useState } from 'react';
import { passwordSchema } from '../../../utils/zod/user.validators';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { useAlert } from '../../../hooks/useAlert';

const fullPasswordSchema = z
  .object({
    currentPassword: passwordSchema.optional(),
    newPassword: passwordSchema.optional(),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Las contraseñas no pueden ser iguales',
  });

export function useProfilePasswordReset() {
  const { showToast, showAlert } = useAlert();
  const [canSubmit, setCanSubmit] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: [],
    newPassword: [],
  });

  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      showToast({
        type: 'error',
        message: 'Por favor, completa todos los campos correctamente.',
        duration: 2000,
      });
      return;
    }

    showAlert({
      type: 'warning',
      title: '¿Estás seguro?',
      message: '¿Quieres guardar los cambios realizados en tu perfil?',
      isConfirm: true,
      onClose: async (confirm) => {
        if (!confirm) {
          showToast({
            type: 'info',
            message: 'No se han guardado los cambios',
            duration: 2000,
          });
          setData({
            currentPassword: '',
            newPassword: '',
          });

          return;
        }

        try {
          await axios.post('/api/auth/change-password', data);
          showToast({
            type: 'success',
            message: 'Contraseña actualizada correctamente',
            duration: 2000,
          });
        } catch (error) {
          console.error('Error al actualizar la contraseña:', error);
          showAlert({
            type: 'error',
            title: 'Error',
            message: `Error al actualizar la contraseña: ${
              error instanceof AxiosError ? error.response?.data.message : 'Error desconocido'
            }`,
            duration: 2000,
          });
        }
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const checkErrors = () => {
      setErrors({
        currentPassword: [],
        newPassword: [],
      });

      try {
        fullPasswordSchema.parse(data);
        setCanSubmit(data.currentPassword !== '' && data.newPassword !== '');
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of (error as z.ZodError).issues) {
            const field = issue.path[0] as keyof typeof data;
            const message = issue.message;
            if (data[field] !== '') {
              setErrors((prev) => {
                const prevErrors = prev[field] || [];
                const newErrors = [...prevErrors.filter((err) => err !== message), message];

                return {
                  ...prev,
                  [field]: newErrors,
                };
              });
            }
          }

          setCanSubmit(false);
        }
      }
    };
    if (data.currentPassword === '' && data.newPassword === '') {
      setErrors({
        currentPassword: [],
        newPassword: [],
      });
      setCanSubmit(false);
      return;
    } else {
      checkErrors();
    }
  }, [data]);

  return {
    canSubmit,
    handleChange,
    handleSubmit,
    data,
    errors,
  };
}
