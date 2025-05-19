import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

import {
  ASSETS_FORM_FIELDS,
  DETAILS_FORM_FIELDS,
  fillFormErrors,
  FormErrors,
  GameForm,
  GameFormEvent,
  GameFormStep,
  GameTextInputEvent,
  parseAssetsInputValue,
  parseDetailsInputValue,
  submitGame,
  VersionForm,
} from '@utils/video-games/videoGames';

import { Categoria } from '@models/categoria.interface';
import { PaginatedResponse } from '@models/base-fetch.interface';
import { gameFormSchema } from '@utils/zod/game.validators';
import { useAlert } from '@hooks/useAlert';
import { useNavigate } from 'react-router';

export interface GameFormContext {
  step: GameFormStep;
  form: GameForm;
  canSubmit: CanSubmitStep;
  errors: FormErrors<GameForm>;
  categorias: Categoria[];
  setPrevStep: (step: GameFormStep) => void;
  handleChange: (e: GameFormEvent) => void;
  handleVersionChange: (newVersion: VersionForm) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

type CanSubmitStep = Record<GameFormStep, boolean>;

export function useGameForm(): GameFormContext {
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
    version: [
      {
        version: null,
        descripcion: null,
        requirements: null,
        file: null,
      },
    ],
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
    const parsedValue = parseDetailsInputValue(e as GameTextInputEvent, form);

    setForm((prev) => {
      return {
        ...prev,
        [key]: parsedValue,
      };
    });
  };

  const handleAssetsChange = (e: GameFormEvent) => {
    const target = e.target as EventTarget & HTMLInputElement;
    if (target) {
      const { name } = target;
      const value = parseAssetsInputValue(e as React.ChangeEvent<HTMLInputElement>);
      const key = name as keyof GameForm;

      setForm((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    }
  };

  const handleVersionChange = useCallback((newVersion: VersionForm) => {
    setForm((prev) => ({
      ...prev,
      version: [newVersion],
    }));
  }, []);

  const handleChange = (e: GameFormEvent) => {
    if (step === 'version') return;
    const handlers: Record<Exclude<GameFormStep, 'version'>, (e: GameFormEvent) => void> = {
      details: handleDetailsChange,
      assets: handleAssetsChange,
    };

    return handlers[step](e);
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
      version: [
        {
          version: null,
          descripcion: null,
          requirements: null,
          file: null,
        },
      ],
    });
    setStep('details');
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await checkErrors();

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

    const detailIsValid = DETAILS_FORM_FIELDS.every((key) => !validateErrors(key, form[key]));
    const assetsIsValid = ASSETS_FORM_FIELDS.every((key) => !validateErrors(key, form[key]));
    const versionIsValid = !validateErrors('version', form.version) && form.version.length > 0;

    setCanSubmit({
      details: detailIsValid,
      assets: assetsIsValid && detailIsValid,
      version: versionIsValid && assetsIsValid && detailIsValid,
    });
  }, [form, errors, step]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<PaginatedResponse<Categoria>>('/api/categorias');
        setCategorias(res.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return {
    step,
    form,
    errors,
    canSubmit,
    categorias,
    setPrevStep,
    handleChange,
    handleSubmit,
    handleCancel,
    handleVersionChange,
  };
}
