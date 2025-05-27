import { useCallback, useEffect, useState } from 'react';
import { fillFormErrors, FormErrors, VersionForm } from '@utils/video-games/videoGames';
import { versionFormSchema } from '@utils/zod/game.validators';
import { z } from 'zod';
import { AssetInputEvent } from '@utils/assets/assets';

export function useVersionForm(onChangeVersion: (newVersion: VersionForm) => void) {
  const [errors, setErrors] = useState<FormErrors<VersionForm>>({} as FormErrors<VersionForm>);
  const [form, setForm] = useState<VersionForm>({
    version: null,
    descripcion: null,
    requirements: null,
    file: null,
  });

  const resetErrors = () => {
    setErrors({} as FormErrors<VersionForm>);
  };

  const checkErrors = useCallback(async () => {
    resetErrors();

    const noChanges = Object.values(form).every((val) => val === null);
    if (noChanges) return;

    try {
      await versionFormSchema.parseAsync(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fillFormErrors(form, error, setErrors);
      }
      console.error('Validation error:', error);
    }
  }, [form]);

  const handleAddRequirement = (req: string) => {
    const requirements = (form.requirements || []).filter((r) => r !== req);
    requirements.push(req);

    setForm((prev) => ({
      ...prev,
      requirements,
    }));
  };

  const handleRemoveRequirement = (req: string) => {
    const requirements = (form.requirements || []).filter((r) => r !== req);
    setForm((prev) => ({
      ...prev,
      requirements,
    }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = e.target;
    const key = name as keyof VersionForm;

    if (key === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setForm((prev) => ({
          ...prev,
          [key]: files.item(0),
        }));
      }

      return;
    }

    if (key === 'requirements') {
      const value = e.target.value;

      const requirements = value.split(',').map((req) => req.trim());
      setForm((prev) => ({
        ...prev,
        [key]: requirements,
      }));
      return;
    }

    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = (e: AssetInputEvent) => {
    const { name, file } = e;
    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Check errors in form
  useEffect(() => {
    checkErrors();
  }, [form, checkErrors]);

  useEffect(() => {
    onChangeVersion(form);
  }, [form, onChangeVersion]);

  return { form, errors, handleDetailsChange, handleFileChange, handleAddRequirement, handleRemoveRequirement };
}
