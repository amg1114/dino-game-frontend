import axios from 'axios';

import { Version, VideoGame } from '@models/video-game.interface';
import { AlertToast, Toast, VisibleAlertToast } from '@utils/context/alertContext';
import { z } from 'zod';

export interface VersionForm {
  version: string | null;
  descripcion: string | null;
  requirements: string[] | null;
  file: File | null;
}

export interface GameForm {
  titulo: null | string;
  descripcion: null | string;
  precio: null | number;
  categorias: null | number[];
  thumb: null | File;
  hero: null | File;
  assets: null | FileList;
  version: VersionForm[];
}

export interface GameFormStepProps {
  form: GameForm;
  errors: FormErrors<GameForm>;
  handleChange: (e: GameFormEvent) => void;
  onChangeVersion: (newVersion: VersionForm) => void;
}

export type FormErrors<T> = Record<keyof T, string[]>;
export type GameTextInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type GameFormEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type GameFormStep = 'details' | 'assets' | 'version';

export const DETAILS_FORM_FIELDS: Array<keyof GameForm> = ['titulo', 'descripcion', 'precio', 'categorias'];
export const ASSETS_FORM_FIELDS: Array<keyof GameForm> = ['thumb', 'hero', 'assets'];
export const FORM_STEP_LABELS: Record<GameFormStep, string> = {
  details: 'Detalles',
  assets: 'Imágenes',
  version: 'Versiones',
};

export function parseDetailsInputValue(e: GameFormEvent, form: GameForm): string | number | number[] | null {
  const { value, name } = e.target;
  const key = name as keyof GameForm;

  if (key === 'categorias') {
    if (e.target instanceof HTMLInputElement) {
      return e.target.checked
        ? [...(form.categorias ?? []), Number(value)]
        : (form.categorias ?? []).filter((cat) => cat !== Number(value));
    }
    return form.categorias;
  }

  if (key === 'precio') {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue;
  }

  return value;
}

export function parseAssetsInputValue(e: React.ChangeEvent<HTMLInputElement>): File | FileList | null {
  const { name, files } = e.target;
  const key = name as keyof GameForm;

  if (key === 'assets') {
    if (files) {
      return files;
    }
    return null;
  }

  if (files && files.length > 0) {
    return files.item(0);
  }

  return null;
}

export function parseVersionInputValue(e: GameFormEvent, form: GameForm): VersionForm | null {
  const { name } = e.target;
  const key = name as keyof VersionForm;
  const currentVersion: VersionForm = form.version?.[0] || { version: null, descripcion: null, requirements: null };

  if (key === 'requirements') {
    const { value } = e.target as HTMLInputElement;
    const requirements = value.split(',').map((req) => req.trim());

    currentVersion.requirements = requirements;
  } else if (key === 'file') {
    const { files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      currentVersion.file = files.item(0);
    }
  } else {
    const { value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    currentVersion[key] = value;
  }

  return currentVersion;
}

export function fillFormErrors<T>(
  form: T,
  error: z.ZodError,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>
) {
  for (const issue of (error as z.ZodError).issues) {
    const field = issue.path[0] as keyof T;

    // If value is null, skip
    if (form[field] === null) continue;

    const message = issue.message;

    setErrors((prev: FormErrors<T>) => {
      const prevErrors: string[] = (prev[field] as string[]) || [];
      const newErrors = [...prevErrors.filter((err: string) => err !== message), message];

      return {
        ...prev,
        [field]: newErrors,
      };
    });
  }
}

export async function submitGame(
  form: GameForm,
  showAlert: (toast: AlertToast) => VisibleAlertToast,
  showToast: (toast: Toast) => void,
  navigate: (path: string) => void
) {
  const loading = showAlert({
    type: 'loading',
    title: 'Creando juego',
    message: 'Creando juego en la base de datos',
  });

  try {
    const { data: videoGame } = await axios.post<VideoGame>('/api/video-games', {
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio: form.precio,
      categorias: form.categorias,
      fechaLanzamiento: new Date().toDateString(),
    });

    const { data: version } = await axios.post<Version>(`/api/video-games/${videoGame.id}/versions`, {
      version: form.version[0].version,
      descripcion: form.version[0].descripcion,
      requisitos: form.version[0].requirements,
    });

    if (form.version[0].file) {
      uploadAsset(form.version[0].file, `/api/assets/versions/${version.id}`);
    }

    if (form.thumb) {
      uploadAsset(form.thumb, `/api/assets/video-games/${videoGame.id}/thumb`);
    }

    if (form.hero) {
      uploadAsset(form.hero, `/api/assets/video-games/${videoGame.id}/hero`);
    }

    if (form.assets) {
      const assets = Array.from(form.assets);
      const uploadPromises = assets.map((asset) => uploadAsset(asset, `/api/assets/video-games/${videoGame.id}/asset`));
      await Promise.all(uploadPromises);
    }

    showToast({
      type: 'success',
      message: 'Juego creado exitosamente',
    });
    navigate('/dashboard/games');
  } catch (error) {
    console.error('Error creating game:', error);
    showToast({
      type: 'error',
      message: 'Error al crear el juego. Por favor, inténtalo de nuevo.',
    });
  } finally {
    loading.close();
  }
}

async function uploadAsset(file: File, path: string) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading asset:', error);
    throw error;
  }
}
