import axios from 'axios';

import { VideoGame } from '@models/video-game.interface';
import { Version } from '@models/version.interface';
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

/**
 * Handles the value extraction and transformation for game form input events.
 *
 * Depending on the input field (`name`), this function processes the value accordingly:
 * - For the 'categorias' field (checkboxes), it adds or removes the category ID from the form's `categorias` array.
 * - For the 'precio' field, it parses the input as a float and returns `null` if the value is not a valid number.
 * - For all other fields, it returns the raw input value.
 *
 * @param e - The input event from a game form field.
 * @param form - The current state of the game form.
 * @returns The processed value for the form field, which can be a string, number, array of numbers, or null.
 */
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

/**
 * Handles changes to the version-related input fields in the game form.
 *
 * Updates the `VersionForm` object within the main form state based on the input event.
 * Handles special cases for the 'requirements' (comma-separated string to array)
 * and 'file' (file input) fields, and updates other fields generically.
 *
 * @param e - The input change event from a version-related form field.
 * @param form - The current state of the game form containing the version data.
 * @returns The updated `VersionForm` object, or `null` if not applicable.
 */
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

/**
 * Handles changes to the assets input field in the game form.
 *
 * This function manages adding, updating, and deleting assets in the form state,
 * depending on the type of asset event received. It only performs actions if the
 * form is not in 'edit' mode. For asset operations, it updates the `assets` array
 * in the form state accordingly. For other fields, it sets the corresponding key
 * in the form state to the provided file.
 *
 * @param e - The asset input event containing details about the action, file, and index.
 * @param mode - The current mode of the game form ('edit' or another mode).
 * @param form - The current state of the game form.
 * @param setForm - The state setter function for updating the game form.
 *
 * @throws Will throw an error if updating or deleting an asset without a valid index.
 */
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

  return uploadAsset(
    file,
    `${import.meta.env.VITE_API_URL}/api/assets/video-games/${initialGame.id}/${field}`,
    index,
    'POST'
  );
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

  return axios.delete(`${import.meta.env.VITE_API_URL}/api/assets/${(asset as Asset).id}`);
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
    `${import.meta.env.VITE_API_URL}/api/assets/video-games/${initialGame.id}/${(asset as Asset).id}`,
    undefined,
    'PUT'
  );
  return res;
}

/**
 * Determines whether a specific form field has errors.
 *
 * @param key - The key of the form field to check.
 * @param value - The value of the form field.
 * @param errors - An object containing form errors, keyed by form field.
 * @returns `true` if the value is `null` or if there is an error associated with the field; otherwise, `false`.
 */
function hasErrors(key: keyof GameForm, value: unknown, errors: FormErrors<GameForm>) {
  return value === null || errors[key as keyof GameForm] !== undefined;
}

/**
 * Determines whether the game details form is valid based on the current mode, form values,
 * initial game data, and any validation errors.
 *
 * - In 'edit' mode, the function checks if any of the form fields have changed compared to the initial game data,
 *   and ensures that all fields are free of validation errors.
 * - In other modes, it only checks that all fields are free of validation errors.
 *
 * @param mode - The current form mode, e.g., 'edit' or 'create'.
 * @param form - The current values of the game details form.
 * @param initialGame - The initial game data to compare against in 'edit' mode, or null/undefined otherwise.
 * @param errors - An object containing validation errors for each form field.
 * @returns `true` if the form is valid (all fields are error-free, and in 'edit' mode, at least one field has changed); otherwise, `false`.
 */
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

/**
 * Populates form error messages for each field based on a Zod validation error.
 *
 * Iterates through the issues in the provided ZodError, and for each issue,
 * updates the corresponding field in the form's error state using the provided
 * setErrors function. If the field's value is `null`, the error is skipped.
 * Ensures that duplicate error messages for a field are not added.
 *
 * @template T - The type of the form object.
 * @param form - The current form values.
 * @param error - The ZodError containing validation issues.
 * @param setErrors - React state setter for updating form errors.
 */
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

/**
 * Converts a `VideoGame` object into a `GameForm` object suitable for form handling.
 *
 * @param videoGame - The `VideoGame` object to be transformed.
 * @returns A `GameForm` object with mapped and defaulted properties:
 * - `titulo`: The title of the video game, or `null` if not present.
 * - `descripcion`: The description of the video game, or `null` if not present.
 * - `precio`: The price of the video game, or `0` if not present.
 * - `categorias`: An array of category IDs extracted from the video game's categories.
 * - `version`, `thumb`, `hero`, `assets`: Set to `null` by default.
 */
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

/**
 * Submits a new video game along with its version and associated assets to the backend API.
 *
 * This function performs the following steps:
 * 1. Shows a loading alert while the game is being created.
 * 2. Sends a POST request to create the video game.
 * 3. Sends a POST request to create the initial version of the game.
 * 4. Uploads the version file, thumbnail, hero image, and additional assets if provided.
 * 5. Shows a success toast and navigates to the games dashboard on success.
 * 6. Handles errors by showing an error toast.
 * 7. Closes the loading alert when finished.
 *
 * @param form - The form data containing game details, version info, and assets.
 * @param showAlert - Function to display a loading alert toast.
 * @param showToast - Function to display a toast notification.
 * @param navigate - Function to navigate to a different route.
 */
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
    const { data: videoGame } = await axios.post<VideoGame>(import.meta.env.VITE_API_URL + '/api/video-games', {
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio: form.precio,
      categorias: form.categorias,
      fechaLanzamiento: new Date().toDateString(),
    });

    const { data: version } = await axios.post<Version>(
      `${import.meta.env.VITE_API_URL}/api/video-games/${videoGame.id}/versions`,
      {
        version: form.version!.version,
        descripcion: form.version!.descripcion,
        requisitos: form.version!.requirements,
      }
    );

    if (form.version!.file) {
      uploadAsset(form.version!.file, `${import.meta.env.VITE_API_URL}/api/assets/versions/${version.id}`);
    }

    if (form.thumb) {
      uploadAsset(form.thumb, `${import.meta.env.VITE_API_URL}/api/assets/video-games/${videoGame.id}/thumb`);
    }

    if (form.hero) {
      uploadAsset(form.hero, `${import.meta.env.VITE_API_URL}/api/assets/video-games/${videoGame.id}/hero`);
    }

    if (form.assets) {
      const uploadPromises = form.assets.map((asset) =>
        uploadAsset(asset, `${import.meta.env.VITE_API_URL}/api/assets/video-games/${videoGame.id}/asset`)
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

/**
 * Updates the details of an existing video game by sending a PATCH request to the server.
 *
 * @param form - The form data containing the updated video game details.
 * @param initialGame - The original video game object to be updated.
 * @returns A Promise resolving to the server's response of the PATCH request.
 */
export function updateGameDetails(form: GameForm, initialGame: VideoGame) {
  return axios.patch(`${import.meta.env.VITE_API_URL}/api/video-games/${initialGame.id}`, {
    titulo: form.titulo,
    descripcion: form.descripcion,
    precio: form.precio,
    categorias: form.categorias,
  });
}

/**
 * Uploads a new version for a given video game.
 *
 * Sends a POST request to the backend API to create a new version entry
 * associated with the specified video game.
 *
 * @param version - The form data containing the new version details.
 * @param initialGame - The video game object to which the version will be added.
 * @returns A promise resolving to the created `Version` object.
 */
export function uploadGameVersion(version: VersionForm, initialGame: VideoGame) {
  return axios
    .post<Version>(`${import.meta.env.VITE_API_URL}/api/video-games/${initialGame.id}/versions`, {
      version: version.version,
      descripcion: version.descripcion,
      requisitos: version.requirements,
    })
    .then((res) => {
      if (version.file) {
        return uploadAsset(version.file, `${import.meta.env.VITE_API_URL}/api/assets/versions/${res.data.id}`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error('Error uploading game version:', error);
      throw new Error('Failed to upload game version');
    });
}
