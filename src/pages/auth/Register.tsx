import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../providers/AuthContext';
import countries from 'world-countries';
import { StyledInput } from '../../components/StyledInput';
import { StyledSelect } from '../../components/StyledSelect';

const schema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  fechaNacimiento: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria')
    .date('La fecha de nacimiento no es válida'),
  pais: z.string().min(1, 'El país es obligatorio'),
  sexo: z.string().min(1, 'El género es obligatorio'),
  correo: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export function Register() {
  const ENDPOINT = '/api/auth/register';
  const navigate = useNavigate();
  const { usuario, isLoading, updateToken } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    pais: '',
    sexo: '',
    correo: '',
    password: '',
  });
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<boolean>(false);

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
  }, [isLoading, usuario, errorModal, successModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      axios
        .post(ENDPOINT, formData)
        .then((response) => {
          updateToken(response.data.access_token);
          setErrorModal(null);
          setSuccessModal(true);
        })
        .catch((error) => {
          setErrorModal(error.response.data.message);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorModal(error.errors[0].message);
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
      {errorModal && (
        <Modal
          onClose={() => setTimeout(() => setErrorModal(null), 500)}
          modalTitle="Error"
          size="xs"
          modalId="error-modal"
        >
          <p className="text-white">{errorModal}</p>
        </Modal>
      )}
      {successModal && (
        <Modal
          onClose={() => setTimeout(() => setSuccessModal(false), 500)}
          modalTitle="Éxito"
          size="xs"
          modalId="success-modal"
        >
          <p className="text-white">Registro Exitoso</p>
        </Modal>
      )}
    </>
  );
}
