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
    const [touched, setTouched] = useState({ correo: false, password: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setTouched((prev) => ({ ...prev, [id]: true }));
    };

    useEffect(() => {

        if (data.correo.length === 0 && data.password.length === 0) {
            setErrorCorreo('');
            setErrorPassword('');
            return;
        }
        try {
            loginSchema.parse(data);
            setErrorCorreo('');
            setErrorPassword('');
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorCorreo('');
                setErrorPassword('');
                for (const err of error.errors) {
                    if (err.path[0] === 'correo' && touched.correo) {
                        setErrorCorreo(err.message);
                    } else if (err.path[0] === 'password' && touched.password) {
                        setErrorPassword(err.message);
                    }
                }
            }
        }
    }, [data, touched]);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            loginSchema.parse(data);
            setErrorCorreo('');
            setErrorPassword('');
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
                for (const err of error.errors) {
                    if (err.path[0] === 'correo') {
                        setErrorCorreo(err.message);
                    } else if (err.path[0] === 'password') {
                        setErrorPassword(err.message);
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (!isLoading && usuario) {
            navigate('/');
        }
    }, [usuario, isLoading, navigate]);

    return {
        data,
        errorCorreo,
        errorPassword,
        handleChange,
        login,
        navigate
    };
}