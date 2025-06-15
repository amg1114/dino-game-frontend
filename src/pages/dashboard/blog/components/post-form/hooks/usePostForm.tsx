import { Post } from '@models/post.interface';
import { BlogForm, PostFormMode } from '@utils/blog/blog';
import { useEffect, useState } from 'react';

export function usePostForm(mode: PostFormMode, initialData?: Post | null) {
  const [form, setForm] = useState<BlogForm>({
    titulo: null,
    descripcion: null,
    thumb: null,
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        titulo: initialData.titulo,
        descripcion: initialData.descripcion,
        thumb: null,
      });

      return;
    }

    if (mode === 'create') {
      setForm({
        titulo: null,
        descripcion: null,
        thumb: null,
      });

      return;
    }

    throw new Error('Invalid mode or initial data');
  }, [initialData, mode]);

  return {
    form,
    mode,
  };
}
