import { PostFormMode } from '@utils/blog/blog';
import { usePostForm } from './hooks/usePostForm';
import { Newspaper, SquarePen } from 'lucide-react';
import { StyledInput } from '@components/forms/StyledInput';
import { StyledFileInput } from '@components/forms/StyledFileInput';
import { ALLOWED_IMAGES } from '@utils/zod/file.validators';
import { RichEditor } from './RichEditor';

export function PostForm({ mode }: { mode: PostFormMode }) {
  const { form, initialData, errors, handleChange, handleCancel, handleSubmit } = usePostForm(mode);

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <h1 className="flex items-center gap-2 text-2xl">
        {mode === 'edit' && (
          <>
            <SquarePen className="text-green" />
            {form.titulo}
          </>
        )}
        {mode === 'create' && (
          <>
            <Newspaper className="text-green" />
            Nueva Publicación
          </>
        )}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-stretch gap-4">
          <StyledFileInput
            id="thumb"
            name="thumb"
            acceptedFileTypes={ALLOWED_IMAGES.join(', ')}
            file={form.thumb}
            uploadedAsset={initialData?.thumb}
            onChange={(e) => handleChange('thumb', e)}
            disableDelete
          />
          <StyledInput
            id="titulo"
            type="text"
            placeholder="Título de la publicación"
            label="Título"
            value={form.titulo || ''}
            onChange={(e) => handleChange('titulo', e)}
            className="flex-1 justify-end"
            errors={errors.titulo}
          />
        </div>
        <RichEditor
          value={form.descripcion || ''}
          errors={errors.descripcion}
          onChange={(e) => handleChange('descripcion', e)}
        />
        <footer className="flex items-center justify-end gap-4">
          <button type="button" className="secondary-button" onClick={() => handleCancel()}>
            Cancelar
          </button>
          <button type="submit" className="primary-button">
            {mode === 'edit' ? 'Guardar' : 'Crear'}
          </button>
        </footer>
      </form>

      <pre>{JSON.stringify(form, null, 4)}</pre>
    </section>
  );
}
