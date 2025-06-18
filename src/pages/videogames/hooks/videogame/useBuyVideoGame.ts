import { useAlert } from '@hooks/useAlert';
import { Descuento } from '@models/descuento.interface';
import { VideoGame } from '@models/video-game.interface';
import { fillFormErrors, FormErrors } from '@utils/video-games/videoGames';
import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';

export interface PurchaseFormData {
  address: string | null;
  city: string | null;
  zipCode: string | null;
  cardNumber: string | null;
  expiryDateMonth: string | null;
  expiryDateYear: string | null;
  cvv: string | null;
  cardName: string | null;
  finalPrice: number;
  originalPrice: number;
  activeDiscount: Descuento | null;
  discountAmount: number;
}

const purchaseFormSchema = z.object({
  address: z.string().min(1, 'Dirección es requerida'),
  city: z.string().min(1, 'Ciudad es requerida'),
  zipCode: z.string().min(1, 'Código postal es requerido'),
  cardNumber: z.string().min(1, 'Número de tarjeta es requerido'),
  expiryDateMonth: z.string().min(1, 'Mes de expiración es requerido'),
  expiryDateYear: z.string().min(1, 'Año de expiración es requerido'),
  cvv: z.string().min(1, 'CVV es requerido'),
  cardName: z.string().min(1, 'Nombre en la tarjeta es requerido'),
});

export function useBuyVideoGame(game: VideoGame | null) {
  const [formData, setFormData] = useState<PurchaseFormData>({
    address: null,
    city: null,
    zipCode: null,
    cardNumber: null,
    expiryDateMonth: null,
    expiryDateYear: null,
    cvv: null,
    cardName: null,
    finalPrice: 0,
    originalPrice: 0,
    activeDiscount: null,
    discountAmount: 0,
  });

  const [errors, setErrors] = useState<FormErrors<PurchaseFormData>>({} as FormErrors<PurchaseFormData>);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkErrors();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const { showToast, showAlert } = useAlert();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (!game) return;

    if (e) {
      e.preventDefault();
    }

    if (game && game.precio !== 0) {
      if (Object.entries(formData).some(([key, val]) => val === null && key !== 'activeDiscount')) {
        console.warn('Formulario incompleto:', formData);
        showToast({
          type: 'error',
          message: 'Por favor, completa todos los campos antes de continuar.',
        });
        return;
      }

      await checkErrors();

      if (Object.keys(errors).length > 0) {
        showToast({
          type: 'error',
          message: 'Por favor, corrige los errores antes de continuar.',
        });

        return;
      }
    }
    const loading = showAlert({
      type: 'loading',
      title: 'Procesando compra',
      message: 'Por favor, espera mientras procesamos tu compra.',
    });

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/video-games/biblioteca/${game.id}`, {
        precio: formData.finalPrice,
      })
      .then(() => {
        showToast({
          type: 'success',
          message: 'Compra realizada con éxito.',
        });

        navigate(`/perfil/biblioteca/`);
      })
      .catch((error) => {
        console.error('Error al procesar la compra:', error);
        showToast({
          type: 'error',
          message: 'Error al procesar la compra. Por favor, inténtalo de nuevo más tarde.',
        });
      })
      .finally(() => {
        loading.close();
      });
  };

  const resetErrors = () => {
    setErrors({} as FormErrors<PurchaseFormData>);
  };

  const checkErrors = useCallback(async () => {
    console.info('Checking errors...');
    resetErrors();

    const noChanges = Object.values(formData).every((val) => val === null);
    if (noChanges) return;

    try {
      await purchaseFormSchema.parseAsync(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fillFormErrors<PurchaseFormData>(formData, error, setErrors);
      }
      console.error('Validation error:', error);
    }
  }, [formData]);

  useEffect(() => {
    if (!game || game.precio === 0) return;
    const activeDiscount = game.descuentos?.find((discount) => {
      const now = new Date();
      const startDate = new Date(discount.fechaInicio);
      const endDate = new Date(discount.fechaFin);
      return now >= startDate && now <= endDate;
    });

    const originalPrice = game.precio;
    const discountAmount = activeDiscount ? (originalPrice * activeDiscount.porcentaje) / 100 : 0;
    const finalPrice = originalPrice - discountAmount;

    setFormData((prev) => ({
      ...prev,
      finalPrice,
      originalPrice: originalPrice,
      activeDiscount: activeDiscount || null,
      discountAmount: discountAmount,
    }));
  }, [game]);

  useEffect(() => {
    checkErrors();
  }, [formData, checkErrors]);

  return {
    formData,
    errors,
    setFormData,
    handleInputChange,
    handleSubmit,
  };
}
