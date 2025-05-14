import { useNavigate } from 'react-router';
import { Modal } from '../../components/Modal';
import { StyledInput } from '../../components/forms/StyledInput';
import { StyledSelect } from '../../components/forms/StyledSelect';
import { useRegister } from './hooks/useRegister';

export function Register() {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    countries,
  } = useRegister();

  const navigate = useNavigate();

  const onClose = (): void => {
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  return (
    <>
      <Modal onClose={onClose} modalTitle="Registrarse" size="lg" modalId="register-modal">
        <form className="mt-4 flex max-h-screen flex-col gap-4 px-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StyledInput
              id="nombre"
              type="text"
              placeholder="Jhon Doe"
              value={formData.nombre}
              onChange={handleChange}
              label="nombre"
              errors={errors.nombre ? errors.nombre : []}
            />
            <StyledInput
              id="fechaNacimiento"
              type="date"
              placeholder="01/01/2000"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              label="fecha de nacimiento"
              errors={errors.fechaNacimiento ? errors.fechaNacimiento : []}
            />
            <StyledSelect
              id="pais"
              options={countries.map((country) => ({ label: country.name.common, value: country.cca2 }))}
              value={formData.pais}
              onChange={handleChange}
              label="país"
              errors={errors.pais ? errors.pais : []}
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
              errors={errors.sexo ? errors.sexo : []}
            />
          </div>
          <StyledInput
            id="correo"
            type="email"
            placeholder="jhondoe@example.com"
            value={formData.correo}
            onChange={handleChange}
            label="correo electrónico"
            errors={errors.correo ? errors.correo : []}
          />
          <StyledInput
            id="password"
            type="password"
            placeholder="**************"
            value={formData.password}
            onChange={handleChange}
            label="contraseña"
            errors={errors.password ? errors.password : []}
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
