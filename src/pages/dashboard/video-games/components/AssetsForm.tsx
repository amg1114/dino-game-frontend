import { StyledFileInput, StyledFileListInput } from '@components/forms/StyledFileInput';
import { GameFormStepProps } from '@utils/video-games/videoGames';

export function AssetsForm(props: GameFormStepProps) {
  const { form, errors } = props;
  return (
    <>
      <p>Las imágenes deben tener una relación de aspecto de 16x9. Se recomienda un tamaño de 1280x720px.</p>
      <div className="flex items-start gap-4">
        <StyledFileInput file={form.thumb} name="thumb" id="thumb" onChange={(e) => props.handleChange(e)} />
        <div>
          <h3 className="leading-none">Miniatura</h3>
          <p>Imagen que se mostrará en la lista de juegos.</p>
          {errors.thumb && errors.thumb.length > 0 && (
            <span className="text-red font-roboto w-full text-sm font-bold">{errors.thumb.slice(0, 2).join(', ')}</span>
          )}
        </div>
      </div>

      <div className="flex items-start gap-4">
        <StyledFileInput file={form.hero} name="hero" id="hero" onChange={(e) => props.handleChange(e)} />
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
          files={form.assets}
          name="assets"
          id="assets"
          onChange={(e) => props.handleChange(e)}
          max={4}
        />
        {errors.assets && errors.assets.length > 0 && (
          <span className="text-red font-roboto w-full text-sm font-bold">{errors.assets.slice(0, 2).join(', ')}</span>
        )}
      </div>
    </>
  );
}
