import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../../hooks/useAlert';
import countries from 'world-countries';
import { userWithPasswordSchema } from '../../../utils/zod/user.validators';
import { ErrorUsuario } from '../../profile/hooks/useUpdateProfile';

export function useRegister() {
    const ENDPOINT = '/api/auth/register';
    const navigate = useNavigate();
    const { usuario, isLoading, logIn } = useAuth();
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const { showToast, showAlert } = useAlert();

    const [errors, setErrors] = useState<ErrorUsuario>({} as ErrorUsuario);
    const [formData, setFormData] = useState({
        nombre: '',
        fechaNacimiento: '',
        pais: '',
        sexo: '',
        correo: '',
        password: '',
    });
    const [touched, setTouched] = useState({
        nombre: false,
        fechaNacimiento: false,
        pais: false,
        sexo: false,
        correo: false,
        password: false,
    });
    const [closeRecoveryToast, setCloseRecoveryToast] = useState<(() => void) | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setTouched((prev) => ({ ...prev, [id]: true }));
    };

    useEffect(() => {
        if (Object.values(formData).every((v) => v.length === 0)) {
            setErrors({} as ErrorUsuario);
            return;
        }
        try {
            userWithPasswordSchema.parse(formData);
            setErrors({} as ErrorUsuario);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: ErrorUsuario = {} as ErrorUsuario;
                for (const issue of error.issues) {
                    const field = issue.path[0] as keyof typeof formData;
                    if (touched[field]) {
                        newErrors[field] = [issue.message];
                    }
                }
                setErrors(newErrors);
            }
        }
    }, [formData, touched]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            userWithPasswordSchema.parse(formData);
            axios
                .post(ENDPOINT, formData)
                .then((response) => {
                    logIn(response.data.access_token);
                    showToast({
                        type: 'success',
                        message: 'Registro exitoso',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 800);
                })
                .catch((error) => {
                    const err = error.response?.data;

                    if (err?.error === 'ACCOUNT_DELETED') {
                        showAlert({
                            type: 'warning',
                            title: 'Cuenta eliminada',
                            message: 'Tu cuenta ha sido eliminada. ¿Deseas recuperarla?',
                            isConfirm: true,
                            confirmText: 'Recuperar',
                            cancelText: 'Cancelar',
                            onClose: (confirmed) => {
                                if (confirmed) {
                                    setIsLoadingEmail(true);
                                    axios.post(`/api/auth/request-account-recovery?email=${formData.correo}`)
                                        .then(() => {
                                            setIsLoadingEmail(false);
                                            showAlert({
                                                type: 'success',
                                                title: 'Éxito',
                                                message: 'Solicitud de recuperación enviada. Revisa tu correo electrónico.',
                                                duration: 3000,
                                            });
                                            navigate('/iniciar-sesion');
                                        })
                                        .catch((error) => {
                                            setIsLoadingEmail(false);
                                            showAlert({
                                                type: 'error',
                                                title: 'Error',
                                                message: error.response?.data?.message || 'Error interno del servidor',
                                                duration: 3000,
                                            });
                                        });
                                }
                            },
                        });
                        return;
                    } else {
                        showAlert({
                            type: 'error',
                            title: 'Error',
                            message: error.response?.data?.message || 'Error interno del servidor',
                            duration: 2000,
                        });
                    }
                });
        } catch (error) {
            if (error instanceof z.ZodError) {
                for (const issue of (error as z.ZodError).issues) {
                    const field = issue.path[0] as keyof typeof formData;
                    const message = issue.message;

                    setErrors((prev: ErrorUsuario) => {
                        const prevErrors = prev[field] || [];
                        const newErrors = [...prevErrors.filter((err) => err !== message), message];

                        return {
                            ...prev,
                            [field]: newErrors,
                        } as ErrorUsuario;
                    });
                }
            }
        }
    };

    useEffect(() => {
        if (!isLoading && usuario) {
            navigate('/');
        }
    }, [isLoading, usuario, navigate]);

    useEffect(() => {
        if (isLoadingEmail) {
            // Mostrar toast y guardar función de cierre
            const close = showToast({
                type: 'info',
                message: 'Enviando solicitud de recuperación...',
                duration: 0
            });
            setCloseRecoveryToast(() => close);
        } else if (closeRecoveryToast) {
            // Cerrar toast cuando termine
            closeRecoveryToast();
            setCloseRecoveryToast(null);
        }
    }, [isLoadingEmail]);

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        countries,
        navigate
    };
}