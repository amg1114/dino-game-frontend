import axios from "axios";
import { Descuento } from "../../../models/descuento.interface";
import { useEffect, useState } from "react";

export function useDescuento(id: number | string | null) {
    const [data, setData] = useState<Descuento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        axios
            .get(`/api/video-games/${id}/descuentos`)
            .then((res) => {
                const data = res.data;
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            })
    }, [id])
    return { data, loading, error };
}