import { StyledInput } from '../../../components/forms/StyledInput';
import { useProfilePasswordReset } from '../hooks/useProfilePasswordReset';

export function ProfilePasswordReset() {
  const { canSubmit, errors, handleChange, handleSubmit, data } = useProfilePasswordReset();

  return (
    <>
      <section className="space-y-4">
        <h1>Restablecer Contraseña</h1>
        <form className="flex max-w-lg flex-col gap-8" onSubmit={(e) => handleSubmit(e)}>
          <StyledInput
            id="currentPassword"
            label="Contraseña Actual"
            type="password"
            placeholder="********"
            value={data.currentPassword}
            errors={errors.currentPassword}
            onChange={(e) => handleChange(e)}
          />
          <StyledInput
            id="newPassword"
            label="Nueva Contraseña"
            type="password"
            placeholder="********"
            value={data.newPassword}
            errors={errors.newPassword}
            onChange={(e) => handleChange(e)}
          />

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
    </>
  );
}
