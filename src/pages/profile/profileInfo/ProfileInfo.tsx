import { StyledInput } from '../../../components/StyledInput';
import { StyledSelect } from '../../../components/StyledSelect';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import countries from 'world-countries';

export function ProfileInfo() {
  const { handleUpdateProfile, handleChange, canSubmit, errors, updates, usuario } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateProfile();
  };

  return (
    <>
      {usuario && (
        <section className="space-y-4">
          <h1>Mis datos personales</h1>
          <form className="grid gap-8 lg:grid-cols-2" onSubmit={(e) => handleSubmit(e)}>
            <StyledInput
              id="nombre"
              label="Nombre"
              type="text"
              placeholder="Escribe tu nombre"
              value={updates.nombre === undefined ? usuario.nombre : updates.nombre}
              errors={errors?.nombre}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <StyledInput
              id="fechaNacimiento"
              label="Fecha de nacimiento"
              type="date"
              placeholder="01/01/2000"
              value={updates.fechaNacimiento === undefined ? usuario.fechaNacimiento : updates.fechaNacimiento}
              errors={errors?.fechaNacimiento}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <StyledSelect
              id="pais"
              options={countries.map((country) => ({ label: country.name.common, value: country.cca2 }))}
              value={updates.pais === undefined ? usuario.pais : updates.pais}
              onChange={(e) => {
                handleChange(e);
              }}
              label="país"
            />
            <StyledSelect
              id="sexo"
              options={[
                { label: 'Masculino', value: 'M' },
                { label: 'Femenino', value: 'F' },
                { label: 'Otro', value: 'D' },
              ]}
              value={updates.sexo === undefined ? usuario.sexo : updates.sexo}
              onChange={(e) => {
                handleChange(e);
              }}
              label="género"
            />
            <div className="col-span-full">
              <StyledInput
                id="correo"
                type="email"
                placeholder="jhondoe@example.com"
                value={updates.correo === undefined ? usuario.correo : updates.correo}
                errors={errors?.correo}
                onChange={(e) => {
                  handleChange(e);
                }}
                label="correo electrónico"
              />
            </div>
            <footer className="col-span-full flex items-center justify-end gap-4">
              <button type="submit" className="primary-button" disabled={!canSubmit}>
                Guardar
              </button>
              <button type="button" className="secondary-button" disabled={!canSubmit}>
                Cancelar
              </button>
            </footer>
          </form>
        </section>
      )}
    </>
  );
}
