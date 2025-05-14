import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { z } from 'zod';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../../hooks/useAlert';
import { loginSchema } from '../../../utils/zod/user.validators';

export function useLogin() {
    const ENDPOINT = '/api/auth/login';
    const { usuario, logIn, isLoading } = useAuth();
    const { showToast, showAlert } = useAlert();
    const navigate = useNavigate();

    const [errorCorreo, setErrorCorreo] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [data, setData] = useState({
        correo: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            loginSchema.parse(data);
            axios
                .post(ENDPOINT, data)
                .then((response) => {
                    logIn(response.data.access_token);
                    showToast({
                        type: 'success',
                        message: 'Inicio de sesión exitoso',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 800);
                })
                .catch((e) => {
                    if (e.response?.status === 401) {
                        setErrorPassword('contraseña incorrecta');
                        setErrorCorreo('');
                    } else if (e.response?.status === 404) {
                        setErrorCorreo('Correo no existente');
                        setErrorPassword('');
                    } else {
                        showAlert({
                            type: 'error',
                            title: 'Error',
                            message: e.response?.data?.message || 'Error interno del servidor',
                            duration: 2000,
                        });
                    }
                });
        } catch (error) {
            if (error instanceof z.ZodError) {
                if (error.errors[0].path[0] === 'correo') {
                    setErrorCorreo(error.errors[0].message);
                } else if (error.errors[0].path[0] === 'password') {
                    setErrorPassword(error.errors[0].message);
                }
            }
        }
    };

    useEffect(() => {
        if (!isLoading && usuario) {
            navigate('/');
        }
        if (data.correo.length === 0 && data.password.length === 0) {
            setErrorCorreo('');
            setErrorPassword('');
        }
    }, [usuario, isLoading, navigate, data]);

    return {
        data,
        errorCorreo,
        errorPassword,
        handleChange,
        login,
    };
}