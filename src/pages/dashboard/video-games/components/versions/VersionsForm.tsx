import { StyledInput } from '@components/forms/StyledInput';
import { StyledTextArea } from '@components/forms/StyledTextArea';
import { useVersionForm } from '../../../hooks/useVersionForm';
import { Check, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { GameFormStepProps } from '@utils/video-games/videoGames';
import { StyledFileInput } from '@components/forms/StyledFileInput';
import { VideoGame } from '@models/video-game.interface';
import { VersionRow } from './VersionRow';

export function VersionsForm(
  props: GameFormStepProps & {
    initialGame?: VideoGame | null;
  }
) {
  const { mode, initialGame, handleVersionChange } = props;

  const { form, errors, handleDetailsChange, handleFileChange, handleAddRequirement, handleRemoveRequirement } =
    useVersionForm(handleVersionChange);
  const [showReqsInput, setShowReqsInput] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');

  return (
    <>
      <>
        <StyledInput
          id="version"
          type="text"
          name="version"
          label="Versión"
          placeholder="1.0.0"
          onChange={(e) => handleDetailsChange(e)}
          value={form.version ?? ''}
          errors={errors.version}
        />
        <StyledTextArea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción de la versión"
          onChange={(e) => handleDetailsChange(e)}
          value={form.descripcion ?? ''}
          errors={errors.descripcion}
        />

        <div className="flex items-start gap-4">
          <StyledFileInput
            id="file"
            name="file"
            onChange={(e) => handleFileChange(e)}
            file={form.file}
            acceptedFileTypes=".zip, .rar, .exe, .msi, .apk"
          />
          <div>
            <label htmlFor="file" className="text-xl leading-none">
              Archivo de descarga
            </label>
            <p>El Archivo que el Usuario podrá descargar al adquirir el Juego.</p>
            {errors.file && errors.file.length > 0 && (
              <span className="text-red font-roboto w-full text-sm font-bold">
                {errors.file.slice(0, 2).join(', ')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="font-bebas w-full text-xl text-white">Requisitos</span>
          {errors.requirements && errors.requirements.length > 0 && (
            <span className="text-red w-full text-sm font-bold">{errors.requirements.slice(0, 2).join(', ')}</span>
          )}
          {form.requirements &&
            form.requirements.map((req, index) => (
              <div
                className="secondary-button group text-md flex cursor-default items-center gap-2"
                key={'req' + index}
              >
                {req}
                <button
                  type="button"
                  className="hover:text-red hidden cursor-pointer group-hover:block"
                  onClick={() => handleRemoveRequirement(req)}
                >
                  <X />
                </button>
              </div>
            ))}

          {showReqsInput && (
            <>
              <input
                type="text"
                name="requirements"
                placeholder="Requisito"
                className="bg-placeholder focus:ring-green rounded px-4 text-white focus:ring-2 focus:outline-none"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddRequirement(newRequirement);
                    setNewRequirement('');
                    setShowReqsInput((prev) => !prev);
                  }
                }}
              />
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  handleAddRequirement(newRequirement);
                  setNewRequirement('');
                  setShowReqsInput((prev) => !prev);
                }}
              >
                <Check />
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setShowReqsInput((prev) => !prev);
                  setNewRequirement('');
                }}
              >
                <X />
              </button>
            </>
          )}

          {!showReqsInput && (
            <button type="button" className="primary-button" onClick={() => setShowReqsInput((prev) => !prev)}>
              <Plus />
            </button>
          )}
        </div>
      </>

      {mode === 'edit' && initialGame && (
        <section>
          <h3>Versiones Previas</h3>
          {initialGame?.versions?.map((version) => <VersionRow version={version} key={version.id}></VersionRow>)}
        </section>
      )}
    </>
  );
}
