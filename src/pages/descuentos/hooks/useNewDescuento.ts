import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { descuentoSchema } from "../../../utils/zod/descuentoValidator";
import { z } from "zod";
import { useAlert } from "../../../hooks/useAlert";

export function useNewDescuento(id: number | string | null) {
    const navigate = useNavigate();
    const [errorFechaInicio, setErrorFechaInicio] = useState<string>('');
    const [errorFechaFin, setErrorFechaFin] = useState<string>('');
    const [errorPorcentaje, setErrorPorcentaje] = useState<string>('');
    const { showToast } = useAlert();
    const [descuento, setDescuento] = useState({
        porcentaje: 0,
        fechaInicio: "",
        fechaFin: "",
    });
    const [touched, setTouched] = useState({
        fechaInicio: false,
        fechaFin: false,
        porcentaje: false,
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setDescuento((prevDescuento) => ({
            ...prevDescuento,
            [id]: id === 'porcentaje' ? parseFloat(value) : value,
        }));
        setTouched((prev) => ({ ...prev, [id]: true }));
    };

    useEffect(() => {
        if (descuento.fechaInicio.length === 0 && descuento.fechaFin.length === 0 && descuento.porcentaje === 0) {
            setErrorFechaInicio('');
            setErrorFechaFin('');
            setErrorPorcentaje('');
            return;
        }
        try {
            descuentoSchema.parse(descuento);
            setErrorFechaInicio('');
            setErrorFechaFin('');
            setErrorPorcentaje('');
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorFechaInicio('');
                setErrorFechaFin('');
                setErrorPorcentaje('');
                for (const err of error.errors) {
                    if (err.path[0] === 'fechaInicio' && touched.fechaInicio) {
                        setErrorFechaInicio(err.message);
                    } else if (err.path[0] === 'fechaFin' && touched.fechaFin) {
                        setErrorFechaFin(err.message);
                    } else if (err.path[0] === 'porcentaje' && touched.porcentaje) {
                        setErrorPorcentaje(err.message);
                    }
                }
            }
        }

    }, [descuento]);

    const handleSubmit = (e: React.FormEvent, ObtenerDescuentos: () => void) => {
        e.preventDefault();
        try {

            descuentoSchema.parse(descuento);
            setErrorFechaInicio('');
            setErrorFechaFin('');
            setErrorPorcentaje('');
            axios
                .post(`/api/video-games/${id}/descuentos`, {
                    ...descuento,
                    porcentaje: descuento.porcentaje / 100,

                })
                .then((res) => {
                    console.log(res.data);
                    ObtenerDescuentos();
                    showToast({
                        type: 'success',
                        message: 'Descuento creado correctamente',
                    });
                    navigate(`/dashboard/juegos/${id}/descuentos`);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        catch (error) {
            if (descuento.fechaFin < descuento.fechaInicio) {
                setErrorFechaFin('La fecha de finalización no puede ser anterior a la fecha de inicio');
            }
            if (error instanceof z.ZodError) {
                setErrorFechaInicio('');
                setErrorFechaFin('');
                setErrorPorcentaje('');
                for (const err of error.errors) {
                    if (err.path[0] === 'fechaInicio') {
                        setErrorFechaInicio(err.message);
                    } else if (err.path[0] === 'fechaFin') {
                        setErrorFechaFin(err.message);
                    } else if (err.path[0] === 'porcentaje') {
                        setErrorPorcentaje(err.message);
                    }
                }
            }
        }

    };
    return {
        descuento,
        handleChange,
        navigate,
        handleSubmit,
        errorFechaInicio,
        errorFechaFin,
        errorPorcentaje,
    };
}