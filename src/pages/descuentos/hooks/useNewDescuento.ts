import { useEffect, useState } from "react";
import axios from "axios";

export function useNewDescuento(id: number | string | null) {
    const [descuento, setDescuento] = useState({
        porcentaje: 0,
        fecha_inicio: "",
        fecha_fin: "",
        video_game_id: id,
    });

    useEffect(() => {
        axios
            .post(`api/video-games/${id}/descuentos`)
            .then((res) => {
                const data = res.data;
                console.log(data);
                setDescuento(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])
    return { descuento };
}