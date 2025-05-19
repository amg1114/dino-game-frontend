import { ChevronRight } from 'lucide-react';
import { FORM_STEP_LABELS } from '@utils/video-games/videoGames';
import { DetailsForm } from '../components/DetailsForm';
import { AssetsForm } from '../components/AssetsForm';
import { VersionsForm } from '../components/VersionsForm';
import { useGameForm } from '../../hooks/useGameForm';

export function CreateVideoGame() {
  const {
    step,
    form,
    errors,
    canSubmit,
    categorias,
    setPrevStep,
    handleChange,
    handleVersionChange,
    handleSubmit,
    handleCancel,
  } = useGameForm();

  const STEP_COMPONENTS = {
    details: DetailsForm,
    assets: AssetsForm,
    version: VersionsForm,
  };

  const StepComponent = STEP_COMPONENTS[step];

  const commonProps = {
    form,
    errors,
    categorias,
    handleChange,
    onChangeVersion: handleVersionChange,
  };

  return (
    <section className="mx-auto w-full max-w-xl space-y-6">
      <h1 className="flex items-center gap-2 text-2xl">
        Crear Juego <ChevronRight className="text-green" />
        {FORM_STEP_LABELS[step]}
      </h1>

      <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
        <StepComponent {...commonProps} />

        <footer className="mt-12 flex justify-end gap-6">
          <button type="button" className="secondary-button mr-auto" onClick={handleCancel}>
            Cancelar
          </button>

          {step !== 'details' && (
            <button type="button" className="secondary-button" onClick={() => setPrevStep(step)}>
              Anterior
            </button>
          )}
          <button type="submit" disabled={!canSubmit[step]} className="primary-button">
            {step === 'version' ? 'Crear' : 'siguiente'}
          </button>
        </footer>
      </form>
    </section>
  );
}
