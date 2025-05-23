import { useNavigate } from "react-router";
import { useAlert } from "../../../../hooks/useAlert";
import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { InputFormsSchema } from "../../../../utils/zod/category.validator";

export function useUpdateCategory(slug: string) {
    const { showToast, showAlert } = useAlert();
    const navigate = useNavigate();

    const [errorTitulo, setErrorTitulo] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");
    const [data, setData] = useState({
        id: "",
        titulo: "",
        descripcion: "",
        videoGames: []
    });

    const [touched, setTouched] = useState({ titulo: false, descripcion: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value
        }));
        setTouched((prev) => ({ ...prev, [id]: true }));
    };

    useEffect(() => {
        axios.get(`/api/categorias/${slug}`)
            .then((resp) => {
                setData(resp.data);
            })
            .catch((err) => {
                console.error(err)
                showAlert({
                    type: 'error',
                    title: 'Error',
                    message: 'No se pudieron cargar los datos de la categoría.',
                    duration: 3000
                });
                navigate('/dashboard/categorias');
            });
    }, [slug]);

    useEffect(() => {
        if (data.titulo.length === 0 && data.descripcion.length === 0) {
            setErrorTitulo("");
            setErrorDescripcion("");
            return;
        }
        try {
            InputFormsSchema.parse(data);
            setErrorTitulo("");
            setErrorDescripcion("");
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorTitulo("");
                setErrorDescripcion("");
                for (const err of error.errors) {
                    if (err.path[0] === 'titulo' && touched.titulo) {
                        setErrorTitulo(err.message);
                    } else if (err.path[0] === 'descripcion' && touched.descripcion) {
                        setErrorDescripcion(err.message);
                    }
                }
            }
        }
    }, [data, touched]);

    const updateCategoria = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.titulo || !data.descripcion) {
            showAlert({
                type: 'error',
                title: 'Campos vacíos',
                message: 'No pueden haber campos vacíos',
                duration: 2000
            })
        }
        try {
            InputFormsSchema.parse(data);
            setErrorTitulo("");
            setErrorDescripcion("");

            axios
                .patch(`/api/categorias/${data.id}`, {
                    titulo: data.titulo,
                    descripcion: data.descripcion
                })
                .then(() => {
                    showToast({
                        type: 'success',
                        message: 'Categoría actualizada correctamente',
                        duration: 3000
                    });
                    setTimeout(() => {
                        navigate('/dashboard/categorias', { state: { needsRefresh: true } });
                    }, 800);
                })
                .catch((e) => {
                    if (e.response?.status === 404) {
                        setErrorTitulo('La categoría no fue encontrada');
                        setErrorDescripcion("");
                    } else {
                        showAlert({
                            type: 'error',
                            title: 'Error',
                            message: e.response?.data?.message || 'internal server error',
                            duration: 2000
                        });
                    }
                });
        } catch (error) {
            if (error instanceof z.ZodError) {
                for (const err of error.errors) {
                    if (err.path[0] === 'titulo' && touched.titulo) {
                        setErrorTitulo(err.message);
                    } else if (err.path[0] === 'descripcion' && touched.descripcion) {
                        setErrorDescripcion(err.message);
                    }
                }
            }
        }
    };

    return {
        data,
        errorTitulo,
        errorDescripcion,
        handleChange,
        updateCategoria,
    };
}