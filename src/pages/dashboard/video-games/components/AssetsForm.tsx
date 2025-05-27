import { StyledFileInput, StyledFileListInput } from '@components/forms/StyledFileInput';
import { VideoGame } from '@models/video-game.interface';
import { GameFormStepProps } from '@utils/video-games/videoGames';
import { ALLOWED_IMAGES } from '@utils/zod/file.validators';

export function AssetsForm(
  props: GameFormStepProps & {
    initialGame?: VideoGame | null;
  }
) {
  const { form, mode, initialGame, errors, handleAssetsChange, handleAssetsUpdate } = props;
  return (
    <>
      <p>Las imágenes deben tener una relación de aspecto de 16x9. Se recomienda un tamaño de 1280x720px.</p>{' '}
      {mode === 'edit' && (
        <p className="border-yellow mb-4 flex items-start gap-1 border-l-4 p-4">
          <span className="flex-1">
            Para cambiar cualquier imagen, haz clic en el botón de reemplazo que aparece al pasar el cursor sobre la
            previsualización. El nuevo archivo se guardará automáticamente en la base de datos.
          </span>
        </p>
      )}
      <div className="flex items-start gap-4 max-md:flex-col">
        <StyledFileInput
          uploadedAsset={initialGame?.thumb}
          file={form.thumb}
          name="thumb"
          id="thumb"
          disableDelete={mode === 'edit'}
          onChange={mode === 'create' ? handleAssetsChange : handleAssetsUpdate}
          acceptedFileTypes={ALLOWED_IMAGES.join(', ')}
        />
        <div>
          <h3 className="leading-none">Miniatura</h3>
          <p>Imagen que se mostrará en la lista de juegos.</p>

          {errors.thumb && errors.thumb.length > 0 && (
            <span className="text-red font-roboto w-full text-sm font-bold">{errors.thumb.slice(0, 2).join(', ')}</span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-4 max-md:flex-col">
        <StyledFileInput
          uploadedAsset={initialGame?.hero}
          file={form.hero}
          name="hero"
          id="hero"
          disableDelete={mode === 'edit'}
          onChange={mode === 'create' ? handleAssetsChange : handleAssetsUpdate}
          acceptedFileTypes={ALLOWED_IMAGES.join(', ')}
        />
        <div>
          <h3 className="leading-none">Imágen Principal</h3>
          <p>Imagen que se mostrará en la parte superior de la página del juego.</p>
          {errors.hero && errors.hero.length > 0 && (
            <span className="text-red font-roboto w-full text-sm font-bold">{errors.hero.slice(0, 2).join(', ')}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="leading-none">Galería</h3>
        <p className="mb-4">Imágenes que se mostrarán en la galería del juego.</p>
        <StyledFileListInput
          uploadedAssets={initialGame?.assets}
          files={form.assets}
          name="assets"
          id="assets"
          onChange={mode === 'create' ? handleAssetsChange : handleAssetsUpdate}
          disableDelete={mode === 'edit'}
          length={4}
          acceptedFileTypes={ALLOWED_IMAGES.join(', ')}
        />
        {errors.assets && errors.assets.length > 0 && (
          <span className="text-red font-roboto w-full text-sm font-bold">{errors.assets.slice(0, 2).join(', ')}</span>
        )}
      </div>
    </>
  );
}
