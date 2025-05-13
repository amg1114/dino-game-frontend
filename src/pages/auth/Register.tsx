import { useNavigate } from 'react-router';
import { Modal } from '../../components/Modal';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import countries from 'world-countries';
import { StyledInput } from '../../components/forms/StyledInput';
import { StyledSelect } from '../../components/forms/StyledSelect';
import { userWithPasswordSchema } from '../../utils/zod/user.validators';
import { useAlert } from '../../hooks/useAlert';

const schema = userWithPasswordSchema;
export function Register() {
  const ENDPOINT = '/api/auth/register';
  const navigate = useNavigate();
  const { usuario, isLoading, logIn } = useAuth();
  const { showToast } = useAlert();
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    pais: '',
    sexo: '',
    correo: '',
    password: '',
  });

  const onClose = (): void => {
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (!isLoading && usuario) {
      navigate('/');
    }
  }, [isLoading, usuario, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      axios
        .post(ENDPOINT, formData)
        .then((response) => {
          logIn(response.data.access_token);
          showToast({
            type: 'success',
            message: 'Registro exitoso',
            duration: 2000,
          });
          onClose();
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

  return (
    <>
      <Modal onClose={onClose} modalTitle="Registrarse" size="lg" modalId="register-modal">
        <form className="mt-4 flex max-h-screen flex-col gap-4 overflow-y-auto px-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StyledInput
              id="nombre"
              type="text"
              placeholder="Jhon Doe"
              value={formData.nombre}
              onChange={handleChange}
              label="nombre"
            />
            <StyledInput
              id="fechaNacimiento"
              type="date"
              placeholder="01/01/2000"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              label="fecha de nacimiento"
            />
            <StyledSelect
              id="pais"
              options={countries.map((country) => ({ label: country.name.common, value: country.cca2 }))}
              value={formData.pais}
              onChange={handleChange}
              label="país"
            />
            <StyledSelect
              id="sexo"
              options={[
                { label: 'Masculino', value: 'M' },
                { label: 'Femenino', value: 'F' },
                { label: 'Otro', value: 'D' },
              ]}
              value={formData.sexo}
              onChange={handleChange}
              label="género"
            />
          </div>
          <StyledInput
            id="correo"
            type="email"
            placeholder="jhondoe@example.com"
            value={formData.correo}
            onChange={handleChange}
            label="correo electrónico"
          />
          <StyledInput
            id="password"
            type="password"
            placeholder="**************"
            value={formData.password}
            onChange={handleChange}
            label="contraseña"
          />
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-1">
            <button type="submit" className="primary-button w-full uppercase sm:w-auto" onClick={handleSubmit}>
              Registrarse
            </button>
            <button
              type="button"
              className="w-full cursor-pointer rounded p-2 text-white hover:underline sm:w-auto"
              onClick={() => navigate('/iniciar-sesion')}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
