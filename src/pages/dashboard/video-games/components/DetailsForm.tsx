import clsx from 'clsx';

import { GameFormStepProps } from '@utils/video-games/videoGames';
import { StyledInput } from '@components/forms/StyledInput';
import { StyledTextArea } from '@components/forms/StyledTextArea';
import { Categoria } from '@models/categoria.interface';

interface DetailsFormProps extends GameFormStepProps {
  categorias: Categoria[];
}

export function DetailsForm(props: DetailsFormProps) {
  const { form, errors, categorias, handleChange } = props;
  return (
    <>
      <StyledInput
        id="titulo"
        type="text"
        name="titulo"
        label="Título"
        placeholder="Título del juego"
        onChange={(e) => handleChange(e)}
        value={form.titulo || ''}
        errors={errors?.titulo}
      />

      <StyledTextArea
        id="descripcion"
        name="descripcion"
        placeholder="Descripción del juego"
        onChange={(e) => handleChange(e)}
        value={form.descripcion || ''}
        errors={errors?.descripcion}
      />

      <StyledInput
        id="precio"
        type="number"
        name="precio"
        label="Precio"
        placeholder="Precio del juego"
        onChange={(e) => handleChange(e)}
        value={form.precio || 0}
        errors={errors?.precio}
      />

      <fieldset className="flex flex-wrap gap-2">
        <legend className="font-bebas mb-4 text-xl">Categorías</legend>
        {categorias.map((category) => (
          <label
            htmlFor={category.slug}
            key={category.slug}
            className={clsx({
              'secondary-button secondary-button--sm': !(form.categorias ?? []).includes(category.id),
              'primary-button primary-button--sm': (form.categorias ?? []).includes(category.id),
            })}
          >
            <input
              id={category.slug}
              type="checkbox"
              name="categorias"
              value={category.id}
              onChange={(e) => handleChange(e)}
              hidden
            />
            {category.titulo}
          </label>
        ))}

        {errors.categorias && errors.categorias.length > 0 && (
          <span className="text-red font-roboto w-full text-sm font-bold">
            {errors.categorias.slice(0, 2).join(', ')}
          </span>
        )}
      </fieldset>
    </>
  );
}
