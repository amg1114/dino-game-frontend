import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function useNewDescuento(id: number | string | null) {
    const navigate = useNavigate();
    const [descuento, setDescuento] = useState({
        porcentaje: 0,
        fechaInicio: "",
        fechaFin: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log("este es setDescuento", setDescuento)
        setDescuento((prevDescuento) => ({
            ...prevDescuento,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post(`/api/video-games/${id}/descuentos`, descuento)
            .then((res) => {
                console.log(res.data);
                navigate(`/dashboard/juegos/${id}/descuentos`);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return { descuento, handleChange, navigate, handleSubmit };
}