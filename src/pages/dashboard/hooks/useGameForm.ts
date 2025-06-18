import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

import {
  ASSETS_FORM_FIELDS,
  CanSubmitStep,
  fillFormErrors,
  FormErrors,
  GameForm,
  GameFormContext,
  GameFormEvent,
  GameFormMode,
  GameFormStep,
  GameTextInputEvent,
  handleAddAssetInEditMode,
  handleDeleteAssetInEditMode,
  handleDetailsInputValue,
  handleReplaceAssetsInEditMode,
  isGameDetailsValid,
  parseVideoGameToForm,
  submitGame,
  updateGameDetails,
  uploadGameVersion,
  VersionForm,
} from '@utils/video-games/videoGames';

import { Categoria } from '@models/categoria.interface';
import { PaginatedResponse } from '@models/base-fetch.interface';
import { gameFormSchema } from '@utils/zod/game.validators';
import { useAlert } from '@hooks/useAlert';
import { useNavigate } from 'react-router';
import { AssetInputEvent } from '@utils/assets/assets';
import { VideoGame } from '@models/video-game.interface';

export function useGameForm(
  mode: GameFormMode = 'create',
  initialGame?: VideoGame | null,
  setInitialGame?: React.Dispatch<React.SetStateAction<VideoGame | null>>
): GameFormContext {
  const { showToast, showAlert } = useAlert();
  const navigate = useNavigate();

  const [step, setStep] = useState<GameFormStep>('details');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [errors, setErrors] = useState<FormErrors<GameForm>>({} as FormErrors<GameForm>);

  const [canSubmit, setCanSubmit] = useState<CanSubmitStep>({
    details: false,
    assets: false,
    version: false,
  });

  const [form, setForm] = useState<GameForm>({
    titulo: null,
    descripcion: null,
    precio: 0,
    categorias: null,
    thumb: null,
    hero: null,
    assets: null,
    version: {
      version: null,
      descripcion: null,
      requirements: null,
      file: null,
    },
  });

  const resetErrors = () => {
    setErrors({} as FormErrors<GameForm>);
  };

  const checkErrors = useCallback(async () => {
    console.info('Checking errors...');
    resetErrors();

    const noChanges = Object.values(form).every((val) => val === null);
    if (noChanges) return;

    try {
      await gameFormSchema.parseAsync(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fillFormErrors<GameForm>(form, error, setErrors);
      }
      console.error('Validation error:', error);
    }
  }, [form]);

  const handleDetailsChange = (e: GameFormEvent) => {
    const { name } = e.target as HTMLInputElement | HTMLTextAreaElement;
    const key = name as keyof GameForm;
    const parsedValue = handleDetailsInputValue(e as GameTextInputEvent, form);

    setForm((prev) => {
      return {
        ...prev,
        [key]: parsedValue,
      };
    });
  };

  const handleDetailsUpdate = async () => {
    await checkErrors();

    if (canSubmit.details) {
      const loading = showAlert({
        type: 'loading',
        title: 'Cargando',
        message: 'Estamos actualizando los detalles del juego...',
      });

      updateGameDetails(form, initialGame!)
        .then(() => {
          return axios.get<VideoGame>(`${import.meta.env.VITE_API_URL}/api/video-games/${initialGame!.slug}`);
        })
        .then((res) => {
          if (setInitialGame) setInitialGame(res.data as VideoGame);

          showToast({
            type: 'success',
            message: 'Detalles del juego actualizados correctamente.',
          });
        })
        .catch((error) => {
          console.error('Error updating game details:', error);
          showToast({
            type: 'error',
            message: 'Error al actualizar los detalles del juego.',
          });
        })
        .finally(() => {
          loading.close();
        });
    }
  };

  const handleAssetsChange = (e: AssetInputEvent) => {
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
  };

  const handleAssetsUpdate = (e: AssetInputEvent) => {
    const { type } = e;

    const requests = {
      add: handleAddAssetInEditMode,
      update: handleReplaceAssetsInEditMode,
      delete: handleDeleteAssetInEditMode,
    };

    const actionLabels = {
      add: { loading: 'añadiendo', completed: 'añadida' },
      update: { loading: 'reemplazando', completed: 'actualizada' },
      delete: { loading: 'eliminando', completed: 'eliminada' },
    };

    const loading = showAlert({
      type: 'loading',
      title: 'Cargando',
      message: `Estamos ${actionLabels[type].loading} la imágen...`,
    });

    requests[type](e, initialGame!)
      .then(() => {
        return axios.get<VideoGame>(`${import.meta.env.VITE_API_URL}/api/video-games/${initialGame!.slug}`);
      })
      .then((res) => {
        if (setInitialGame) setInitialGame(res.data as VideoGame);
        showToast({
          type: 'success',
          message: `Imágen ${actionLabels[type].loading} correctamente.`,
        });
      })
      .catch((error) => {
        console.error('Error updating asset:', error);
        showToast({
          type: 'error',
          message: `Error, la impagen no ha podido ser ${actionLabels[type].completed}`,
        });
      })
      .finally(() => {
        loading.close();
      });
  };

  const handleVersionChange = useCallback((newVersion: VersionForm) => {
    setForm((prev) => ({
      ...prev,
      version: newVersion,
    }));
  }, []);

  const handleSaveVersion = async () => {
    await checkErrors();
    if (canSubmit.version) {
      const loading = showAlert({
        type: 'loading',
        title: 'Cargando',
        message: 'Estamos guardando la versión del juego...',
      });

      uploadGameVersion(form.version!, initialGame!)
        .then(() => {
          return axios.get<VideoGame>(`${import.meta.env.VITE_API_URL}/api/video-games/${initialGame!.slug}`);
        })
        .then((res) => {
          if (setInitialGame) setInitialGame(res.data as VideoGame);
          showToast({
            type: 'success',
            message: 'Versión del juego guardada correctamente.',
          });
          setStep('details');
        })
        .catch((error) => {
          console.error('Error saving game version:', error);
          showToast({
            type: 'error',
            message: 'Error al guardar la versión del juego.',
          });
        })
        .finally(() => {
          loading.close();
        });

      return;
    }
  };

  const handleCancel = () => {
    setForm({
      titulo: null,
      descripcion: null,
      precio: 0,
      categorias: null,
      thumb: null,
      hero: null,
      assets: null,
      version: {
        version: null,
        descripcion: null,
        requirements: null,
        file: null,
      },
    });
    setStep('details');
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await checkErrors();

    if (mode === 'edit' && step === 'details') return handleDetailsUpdate();
    if (mode === 'edit' && step === 'version') return handleSaveVersion();

    if (canSubmit[step]) {
      if (step === 'version') {
        return submitGame(form, showAlert, showToast, navigate);
      }
      setNextStep(step);
    } else {
      showToast({
        type: 'error',
        message: 'Por favor, completa todos los campos requeridos.',
      });
    }
  };

  const setNextStep = (currentStep: GameFormStep) => {
    if (currentStep === 'details') {
      return setStep('assets');
    } else if (currentStep === 'assets') {
      return setStep('version');
    }
    return setStep('details');
  };

  const setPrevStep = (currentStep: GameFormStep) => {
    if (currentStep === 'assets') {
      return setStep('details');
    } else if (currentStep === 'version') {
      return setStep('assets');
    }
    return setStep('details');
  };

  // Check errors in form
  useEffect(() => {
    checkErrors();
  }, [form, step, checkErrors]);

  // Check if can submit
  useEffect(() => {
    const validateErrors = (key: keyof GameForm, value: unknown) =>
      value === null || errors[key as keyof GameForm] !== undefined;

    const detailIsValid = isGameDetailsValid(mode, form, initialGame, errors);
    const assetsIsValid = mode === 'edit' || ASSETS_FORM_FIELDS.every((key) => !validateErrors(key, form[key]));
    const versionIsValid = !validateErrors('version', form.version);

    setCanSubmit({
      details: isGameDetailsValid(mode, form, initialGame!, errors),
      assets: (mode === 'edit' || assetsIsValid) && detailIsValid,
      version: versionIsValid,
    });
  }, [form, mode, initialGame, errors, step]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<PaginatedResponse<Categoria>>(import.meta.env.VITE_API_URL + '/api/categorias');
        setCategorias(res.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch game data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialGame) {
      const parsedGame = parseVideoGameToForm(initialGame);
      setForm(parsedGame);
    } else if (mode === 'edit' && initialGame === undefined) {
      throw new Error('Initial game data is required in edit mode');
    }
  }, [mode, initialGame]);

  return {
    mode,
    step,
    form,
    initialGame,
    errors,
    canSubmit,
    categorias,
    setPrevStep,
    setStep,
    handleSubmit,
    handleCancel,
    handleVersionChange,
    handleDetailsChange,
    handleAssetsChange,
    handleAssetsUpdate,
  };
}
