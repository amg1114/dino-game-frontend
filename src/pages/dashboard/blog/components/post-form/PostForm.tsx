import { PostFormMode } from '@utils/blog/blog';
import { usePostForm } from './hooks/usePostForm';
import { Newspaper, SquarePen } from 'lucide-react';
import { StyledInput } from '@components/forms/StyledInput';
import { StyledFileInput } from '@components/forms/StyledFileInput';
import { ALLOWED_IMAGES } from '@utils/zod/file.validators';
import { RichEditor } from './RichEditor';

export function PostForm({ mode }: { mode: PostFormMode }) {
  const { form } = usePostForm(mode);

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

      <form className="flex flex-col gap-4">
        <div className="flex items-stretch gap-4">
          <StyledFileInput
            id="thumb"
            name="thumb"
            acceptedFileTypes={ALLOWED_IMAGES.join(', ')}
            file={form.thumb}
            onChange={() => {}}
          />
          <StyledInput
            id="titulo"
            type="text"
            placeholder="Título de la publicación"
            label="Título"
            value={form.titulo || ''}
            onChange={() => {}}
            className="flex-1 justify-end"
          />
        </div>
        <RichEditor />
      </form>
    </section>
  );
}
