import axios from 'axios';

import { Version, VideoGame } from '@models/video-game.interface';
import { AlertToast, Toast, VisibleAlertToast } from '@utils/context/alertContext';
import { z } from 'zod';
import { AssetInputEvent, uploadAsset } from '@utils/assets/assets';
import { Categoria } from '@models/categoria.interface';
import { Asset } from '@models/asset.interface';

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
  assets: null | File[];
  version: VersionForm | null;
}

export interface GameFormStepProps extends GameFormChangeHandlers {
  mode: GameFormMode;
  form: GameForm;
  errors: FormErrors<GameForm>;
}

export interface GameFormChangeHandlers {
  handleVersionChange: (newVersion: VersionForm) => void;
  handleDetailsChange: (e: GameFormEvent) => void;
  handleAssetsChange: (e: AssetInputEvent) => void;
  handleAssetsUpdate: (e: AssetInputEvent) => void;
}

export interface GameFormContext extends GameFormChangeHandlers {
  step: GameFormStep;
  mode: GameFormMode;
  form: GameForm;
  initialGame?: VideoGame | null;
  canSubmit: CanSubmitStep;
  errors: FormErrors<GameForm>;
  categorias: Categoria[];
  setPrevStep: (step: GameFormStep) => void;
  setStep: (step: GameFormStep) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

export type GameFormMode = 'create' | 'edit';
export type FormErrors<T> = Record<keyof T, string[]>;
export type GameTextInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type GameFormEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type GameFormStep = 'details' | 'assets' | 'version';
export type CanSubmitStep = Record<GameFormStep, boolean>;

export const DETAILS_FORM_FIELDS: Array<keyof GameForm> = ['titulo', 'descripcion', 'precio', 'categorias'];
export const ASSETS_FORM_FIELDS: Array<keyof GameForm> = ['thumb', 'hero', 'assets'];
export const FORM_STEP_LABELS: Record<GameFormStep, string> = {
  details: 'Detalles',
  assets: 'Imágenes',
  version: 'Versiones',
};

export function handleDetailsInputValue(e: GameFormEvent, form: GameForm): string | number | number[] | null {
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

export function handleVersionInputValue(e: GameFormEvent, form: GameForm): VersionForm | null {
  const { name } = e.target;
  const key = name as keyof VersionForm;
  const currentVersion: VersionForm =
    form.version || ({ version: null, descripcion: null, requirements: null } as VersionForm);

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

export function handleAssetsInputValue(
  e: AssetInputEvent,
  mode: GameFormMode,
  form: GameForm,
  setForm: React.Dispatch<React.SetStateAction<GameForm>>
) {
  if (mode === 'edit') return;

  const { name, file, type, index } = e;
  const key = name as keyof GameForm;

  const isAddingAsset = key === 'assets' && type === 'add';
  const isUpdatingAsset = key === 'assets' && type === 'update';
  const isDeletingAsset = key === 'assets' && type === 'delete';

  if (isAddingAsset) {
    return setForm((prev) => ({
      ...prev,
      assets: [...(prev.assets || []), file!],
    }));
  }

  if (isUpdatingAsset) {
    if (index === undefined || index === null) throw new Error('Index is required to update asset');
    const updatedAssets = [...(form.assets || []).slice(0, index), file!, ...(form.assets || []).slice(index + 1)];

    return setForm((prev) => ({
      ...prev,
      assets: updatedAssets,
    }));
  }

  if (isDeletingAsset) {
    if (index === undefined || index === null) throw new Error('Index is required to delete asset');
    const updatedAssets = (form.assets || []).filter((_, i) => i !== index);

    return setForm((prev) => ({
      ...prev,
      assets: updatedAssets,
    }));
  }

  setForm((prev) => ({
    ...prev,
    [key]: file,
  }));
}

/**
 * Handles adding an asset to a video game while in edit mode.
 *
 * This function processes the asset input event, validates the file,
 * determines the appropriate field for the asset, and uploads the asset
 * to the server using the specified API endpoint.
 *
 * @param e - The asset input event containing the asset details, including name, file, and index.
 * @param initialGame - The initial video game object to which the asset will be added.
 * @returns A promise that resolves with the result of the asset upload operation.
 * @throws Will throw an error if the file is not provided in the event.
 */
export async function handleAddAssetInEditMode(e: AssetInputEvent, initialGame: VideoGame) {
  const { name, file, index } = e;
  if (!file) throw new Error('File is required to add asset');

  const field = name === 'assets' ? 'asset' : name;

  return uploadAsset(file, `/api/assets/video-games/${initialGame.id}/${field}`, index, 'POST');
}

/**
 * Handles the deletion of an asset while in edit mode for a video game.
 *
 * Depending on the `name` property of the event, this function either deletes an asset from the `assets` array
 * at the specified `index`, or deletes a single asset property from the `initialGame` object.
 * Throws an error if the asset or index is not found.
 *
 * @param e - The asset input event containing the asset name and optional index.
 * @param initialGame - The initial state of the video game containing the assets.
 * @returns A promise resolving to the Axios response of the delete request.
 * @throws Error if the index is missing when deleting from the assets array, or if the asset is not found.
 */
export async function handleDeleteAssetInEditMode(e: AssetInputEvent, initialGame: VideoGame) {
  const { name, index } = e;
  let asset;

  if (name === 'assets') {
    if (index === undefined || index === null) {
      throw new Error('Index is required to delete asset');
    }

    asset = initialGame.assets?.[index];
    if (!asset) {
      throw new Error('Asset not found');
    }
  } else {
    asset = initialGame[name as keyof VideoGame];
    if (!asset) throw new Error('Asset not found');
  }

  return axios.delete(`/api/assets/${(asset as Asset).id}`);
}

/**
 * Handles replacing an asset in edit mode for a video game.
 *
 * Depending on the `name` property of the event, this function will either:
 * - Replace an asset in the `assets` array at the specified `index`, or
 * - Replace a top-level asset property of the `VideoGame` object.
 *
 * The function uploads the new asset file to the server using a PUT request.
 *
 * @param e - The asset input event containing the asset name, file, and optional index.
 * @param initialGame - The initial `VideoGame` object to update.
 * @returns A promise resolving to the result of the asset upload.
 * @throws If the file is missing, the index is required but not provided, or the asset is not found.
 */
export async function handleReplaceAssetsInEditMode(e: AssetInputEvent, initialGame: VideoGame) {
  const { name, file, index } = e;

  let asset;

  if (!file) throw new Error('File is required to update asset');

  if (name === 'assets') {
    if (index === undefined || index === null) {
      throw new Error('Index is required to update asset');
    }

    if (!initialGame?.assets?.[index]) {
      throw new Error('Asset not found');
    }

    asset = initialGame.assets[index];
  } else {
    asset = initialGame[name as keyof VideoGame];
    if (!asset) throw new Error('Asset not found');
  }

  const res = await uploadAsset(
    file,
    `/api/assets/video-games/${initialGame.id}/${(asset as Asset).id}`,
    undefined,
    'PUT'
  );
  return res;
}

function hasErrors(key: keyof GameForm, value: unknown, errors: FormErrors<GameForm>) {
  return value === null || errors[key as keyof GameForm] !== undefined;
}

export function isGameDetailsValid(
  mode: GameFormMode,
  form: GameForm,
  initialGame: VideoGame | null | undefined,
  errors: FormErrors<GameForm>
): boolean {
  if (mode === 'edit' && initialGame) {
    const isNotEqual = !DETAILS_FORM_FIELDS.every((key) => {
      return key === 'categorias'
        ? initialGame.categorias
            .map((cat) => cat.id)
            .sort()
            .toString() === form[key]?.sort().toString()
        : initialGame[key as keyof VideoGame] === form[key];
    });

    return isNotEqual && DETAILS_FORM_FIELDS.every((key) => !hasErrors(key, form[key], errors));
  }

  return DETAILS_FORM_FIELDS.every((key) => !hasErrors(key, form[key], errors));
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

export function parseVideoGameToForm(videoGame: VideoGame): GameForm {
  return {
    titulo: videoGame.titulo ?? null,
    descripcion: videoGame.descripcion ?? null,
    precio: videoGame.precio ?? 0,
    categorias: videoGame.categorias.map((cat) => cat.id),
    version: null,
    thumb: null,
    hero: null,
    assets: null,
  };
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
      version: form.version!.version,
      descripcion: form.version!.descripcion,
      requisitos: form.version!.requirements,
    });

    if (form.version!.file) {
      uploadAsset(form.version!.file, `/api/assets/versions/${version.id}`);
    }

    if (form.thumb) {
      uploadAsset(form.thumb, `/api/assets/video-games/${videoGame.id}/thumb`);
    }

    if (form.hero) {
      uploadAsset(form.hero, `/api/assets/video-games/${videoGame.id}/hero`);
    }

    if (form.assets) {
      const uploadPromises = form.assets.map((asset) =>
        uploadAsset(asset, `/api/assets/video-games/${videoGame.id}/asset`)
      );
      await Promise.all(uploadPromises);
    }

    showToast({
      type: 'success',
      message: 'Juego creado exitosamente',
    });
    navigate('/dashboard/juegos');
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

export function updateGameDetails(form: GameForm, initialGame: VideoGame) {
  return axios.patch(`/api/video-games/${initialGame.id}`, {
    titulo: form.titulo,
    descripcion: form.descripcion,
    precio: form.precio,
    categorias: form.categorias,
  });
}

export function uploadGameVersion(version: VersionForm, initialGame: VideoGame) {
  return axios.post<Version>(`/api/video-games/${initialGame.id}/versions`, {
    version: version.version,
    descripcion: version.descripcion,
    requisitos: version.requirements,
  });
}
