import { useNavigate } from "react-router";
import { useAlert } from "../../../../hooks/useAlert";
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { InputFormsSchema } from "../../../../utils/zod/category.validator";

export function useCreateCategory() {
    const ENDPOINT = '/api/categorias';
    const { showToast, showAlert } = useAlert();
    const navigate = useNavigate();

    const [errorTitulo, setErrorTitulo] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");
    const [data, setData] = useState({
        titulo: "",
        descripcion: ""
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

    const createCategoria = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({ titulo: true, descripcion: true })

        if (!data.descripcion.trim()) {
            showAlert({
                type: 'error',
                title: 'Falta la descripción',
                message: "Debes añadir una descripción a la categoria",
                duration: 3000
            })
            setErrorDescripcion("La descripción no puede estar vacía")
        }

        try {
            InputFormsSchema.parse(data);
            setErrorTitulo("");
            setErrorDescripcion("");

            console.log('enviando datos..', data);
            axios
                .post(ENDPOINT, data)
                .then((resp) => {
                    setData(resp.data);

                    showToast({
                        type: 'success',
                        message: 'Se creó la categoría existosamente',
                        duration: 4000
                    });
                    setTimeout(() => {
                        navigate('/dashboard/categorias', { state: { needsRefresh: true } });
                    }, 800);
                })
                .catch((e) => {
                    if (e.response?.status === 409) {
                        setErrorTitulo('Esta categoría ya existe');
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
                console.log('error de validacion zod:', error.errors)
                for (const err of error.errors) {
                    if (err.path[0] === 'titulo') {
                        setErrorTitulo(err.message);
                    } else if (err.path[0] === 'descripcion' && touched.descripcion) {
                        setErrorDescripcion('La categoría no puede estar vacía')
                    }
                }
            };
        }
    }

    return {
        data,
        errorTitulo,
        errorDescripcion,
        handleChange,
        createCategoria,
        navigate
    };
}
