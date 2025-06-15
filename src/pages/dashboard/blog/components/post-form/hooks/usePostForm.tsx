import { Post } from '@models/post.interface';
import { AssetInputEvent, uploadAsset } from '@utils/assets/assets';
import { PostForm, PostFormField, PostFormMode } from '@utils/blog/blog';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { RichEditorChangeEvent } from '../RichEditor';
import { fillFormErrors, FormErrors } from '@utils/video-games/videoGames';

import { postFormSchema } from '@utils/zod/post.validator';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useAlert } from '@hooks/useAlert';
import axios from 'axios';

export function usePostForm(mode: PostFormMode, initialData?: Post | null) {
  const navigate = useNavigate();
  const { showAlert, showToast } = useAlert();
  const [form, setForm] = useState<PostForm>({
    titulo: null,
    descripcion: null,
    thumb: null,
  });

  const [errors, setErrors] = useState<FormErrors<PostForm>>({} as FormErrors<PostForm>);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (
    field: PostFormField,
    e: ChangeEvent<HTMLInputElement> | AssetInputEvent | RichEditorChangeEvent
  ) => {
    if (field !== 'thumb') {
      const value =
        field === 'descripcion' ? (e as RichEditorChangeEvent) : (e as ChangeEvent<HTMLInputElement>).target.value;
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
      return;
    }

    if (field === 'thumb') {
      const { file, type } = e as AssetInputEvent;
      if (type === 'delete') {
        console.warn('Cannot delete thumb in create mode');
        return;
      }
      setForm((prev) => ({
        ...prev,
        thumb: file,
      }));
      return;
    }
  };

  const handleCancel = () => {
    setForm({
      titulo: null,
      descripcion: null,
      thumb: null,
    });
    setErrors({} as FormErrors<PostForm>);
    navigate('/dashboard/blog');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkErrors();

    if (!canSubmit) {
      showToast({
        type: 'error',
        message: 'Por favor, corrige los errores antes de enviar el formulario.',
      });
      return;
    }

    const loading = showAlert({
      type: 'loading',
      title: 'Cargando...',
      message: 'Por favor, espera mientras se procesa tu solicitud.',
    });

    if (mode === 'create') {
      try {
        await uploadPost();
        navigate('/dashboard/blog');
      } catch (error) {
        console.error('Error uploading post:', error);
        showAlert({
          type: 'error',
          title: 'Error al crear publicación',
          message: 'Error al crear la publicación. Por favor, inténtalo de nuevo.',
          duration: 2000,
        });
      } finally {
        loading.close();
      }
      return;
    }

    if (mode === 'edit') {
      await updatePost();
      try {
        await updatePost();
        navigate('/dashboard/blog');
      } catch (error) {
        console.error('Error updating post:', error);
        showAlert({
          type: 'error',
          title: 'Error al actualizar publicación',
          message: 'Error al actualizar la publicación. Por favor, inténtalo de nuevo.',
          duration: 2000,
        });
      } finally {
        loading.close();
      }
    }
  };

  const uploadPost = () => {
    return axios
      .post<Post>('/api/noticias', {
        titulo: form.titulo,
        descripcion: form.descripcion,
        fecha: new Date().toISOString(),
      })
      .then((res) => {
        return uploadAsset(form.thumb!, `/api/assets/noticias/${res.data.id}`);
      })
      .catch((error) => {
        console.error('Error uploading post:', error);
        throw error;
      });
  };

  const updatePost = async () => {
    return axios
      .patch<Post>(`/api/noticias/${initialData?.id}`, {
        titulo: form.titulo,
        descripcion: form.descripcion,
      })
      .then((res) => {
        if (form.thumb) {
          return uploadAsset(
            form.thumb!,
            `/api/assets/noticias/${initialData!.id}/${initialData!.thumb.id}`,
            undefined,
            'PUT'
          );
        }
        return res.data;
      })
      .catch((error) => {
        console.error('Error updating post:', error);
        throw error;
      });
  };

  const resetErrors = () => {
    setErrors({} as FormErrors<PostForm>);
  };

  const checkErrors = useCallback(async () => {
    console.info('Checking errors...');
    resetErrors();

    const noChanges = Object.values(form).every((val) => val === null);
    if (noChanges) return;

    try {
      await postFormSchema.parseAsync(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fillFormErrors<PostForm>(form, error as z.ZodError, setErrors);
      }
      console.error('Validation error:', error);
    }
  }, [form]);

  // Initialize form based on mode and initialData
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

  // Check errors
  useEffect(() => {
    checkErrors();
  }, [form, checkErrors]);

  useEffect(() => {
    if (mode === 'create') {
      setCanSubmit(
        Object.keys(errors).length === 0 && form.titulo !== null && form.descripcion !== null && form.thumb !== null
      );
    } else if (mode === 'edit' && initialData) {
      setCanSubmit(
        (Object.keys(errors).length === 0 &&
          Object.entries(form).some(([key, value]) => value !== null && value !== initialData[key as keyof Post])) ||
          form.thumb !== null
      );
    }
  }, [errors, form, initialData, mode]);

  return {
    form,
    mode,
    initialData,
    errors,
    canSubmit,
    handleChange,
    handleCancel,
    handleSubmit,
  };
}
