import { GameFormContext, GameFormStep } from '@utils/video-games/videoGames';
import { FORM_STEP_LABELS } from '@utils/video-games/videoGames';
import { ChevronRight, SquarePen } from 'lucide-react';
import { AssetsForm } from './AssetsForm';
import { DetailsForm } from './DetailsForm';
import { VersionsForm } from './versions/VersionsForm';

export function GameForm({ formContext }: { formContext: GameFormContext }) {
  const { mode, step, canSubmit, form, handleCancel, handleSubmit, setPrevStep, setStep } = formContext;

  const STEP_COMPONENTS = {
    details: DetailsForm,
    assets: AssetsForm,
    version: VersionsForm,
  };

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <section className="mx-auto w-full max-w-xl space-y-6">
      {mode === 'create' && (
        <h1 className="flex items-center gap-2 text-2xl">
          Crear Juego
          <ChevronRight className="text-green" />
          FORM_STEP_LABELS[step]
        </h1>
      )}

      {mode === 'edit' && (
        <h1 className="flex items-center gap-2 text-2xl">
          <SquarePen className="text-green" /> {form.titulo || 'Juego'}
          {Object.entries(FORM_STEP_LABELS).map(([key, label], index) => (
            <>
              <ChevronRight className="text-green" />
              <button
                key={'step-' + index}
                className="hover:text-green cursor-pointer"
                onClick={() => setStep(key as GameFormStep)}
              >
                {label}
              </button>
            </>
          ))}
        </h1>
      )}

      <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
        <StepComponent {...formContext} />

        {(mode == 'create' || (mode == 'edit' && step != 'assets')) && (
          <footer className="mt-12 flex justify-end gap-6">
            <button type="button" className="secondary-button mr-auto" onClick={handleCancel}>
              Cancelar
            </button>

            {step !== 'details' && mode !== 'edit' && (
              <button type="button" className="secondary-button" onClick={() => setPrevStep(step)}>
                Anterior
              </button>
            )}

            <button type="submit" disabled={!canSubmit[step]} className="primary-button">
              {mode === 'create' ? (step === 'version' ? 'Crear' : 'siguiente') : 'Guardar'}
            </button>
          </footer>
        )}
      </form>
    </section>
  );
}
