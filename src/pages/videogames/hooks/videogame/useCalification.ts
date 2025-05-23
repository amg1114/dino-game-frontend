import axios from "axios";
import { VideoGame } from "../../../../models/video-game.interface";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";

export function useCalification(game: VideoGame) {
    const { slug } = useParams();
    const [calification, setCalification] = useState<number>(0);
    const { usuario } = useAuth()

    const handleSetCalification = (value: number) => {
        axios.post('/api/video-games/' + slug, { puntaje: value })
            .then(() => {
                setCalification(value);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (usuario && usuario.calificaciones) {
            const calificacion = usuario.calificaciones.find((calif) => calif.videoGameID === game.id);
            if (calificacion) {
                setCalification(Number(calificacion.calificacion));
                return;
            } else {
                setCalification(Math.round(Number(game.calificaciones.promedio)));
            }
        } else {
            setCalification(Math.round(Number(game.calificaciones.promedio)));
        }
    }, [game, usuario]);

    return {
        calification,
        handleSetCalification,
    }
}