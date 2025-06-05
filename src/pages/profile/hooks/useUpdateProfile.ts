import { useEffect, useState } from 'react';
import { z } from 'zod';

import { useAlert } from '../../../hooks/useAlert';
import { useAuth } from '../../../hooks/useAuth';
import { Usuario } from '../../../models/user.interface';
import { userSchema } from '../../../utils/zod/user.validators';

export type ErrorUsuario = Record<keyof Usuario, string[]>;

export function useUpdateProfile() {
  const { showToast, showAlert } = useAlert();
  const { updateUsuario, usuario } = useAuth();
  const [updates, setUpdates] = useState<Partial<Usuario>>({});
  const [errors, setErrors] = useState<ErrorUsuario>({} as ErrorUsuario);

  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof Usuario;

    // Check if the value is empty and set the error message
    if (usuario && usuario[key] !== value) {
      // If the value is different from the original, set it in updates
      setUpdates((prev) => {
        const newValue = {
          ...prev,
          [key]: value,
        };

        return newValue;
      });

      return;
    }

    // If the value is the same as the original, remove it from updates
    setUpdates(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...cleanVal } = updates;
      return cleanVal;
    });
  };

  const handleUpdateProfile = async () => {
    showAlert({
      type: 'warning',
      title: '¿Estás seguro?',
      message: '¿Quieres guardar los cambios realizados en tu perfil?',
      isConfirm: true,
      onClose: (confirm) => {
        if (!confirm) {
          showToast({
            type: 'info',
            message: 'No se han guardado los cambios',
            duration: 2000,
          });
          setUpdates({} as Partial<Usuario>);
          return;
        }

        updateProfile();
      },
    });
  };

  const updateProfile = async () => {
    if (!canSubmit) {
      showToast({
        type: 'error',
        message: 'Por favor, completa todos los campos requeridos',
        duration: 2000,
      });
      return;
    }

    const loadingAlert = showAlert({
      type: 'loading',
      title: 'Actualizando perfil',
      message: 'Por favor, espere...',
    });

    try {
      await updateUsuario(updates);
      showToast({
        type: 'success',
        message: 'Perfil actualizado correctamente',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      showToast({
        type: 'error',
        message: 'Error al actualizar el perfil',
        duration: 2000,
      });
    } finally {
      loadingAlert.close();
    }
  };

  useEffect(() => {
    const checkErrors = () => {
      if (Object.keys(updates).length === 0) {
        setErrors({} as ErrorUsuario);
      }

      try {
        userSchema.parse({
          ...usuario,
          ...updates,
        });

        setErrors({} as ErrorUsuario);
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of (error as z.ZodError).issues) {
            const field = issue.path[0] as keyof Usuario;
            const message = issue.message;

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
      }
    };

    checkErrors();
  }, [updates, usuario]);

  useEffect(() => {
    const isValid = Object.keys(updates).length > 0 && Object.keys(errors).length === 0;
    setCanSubmit(isValid);
  }, [updates, errors]);

  return { handleUpdateProfile, handleChange, canSubmit, errors, updates, usuario };
}
