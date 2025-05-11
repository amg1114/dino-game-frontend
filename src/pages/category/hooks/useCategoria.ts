import { useEffect, useState } from "react";
import { VideoGame } from "../../../models/video-game.interface";
import axios from "axios";


export interface SectionData<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

export interface FetchResponse<T> {
    data: T[];
}

export function useCategoria(slug: string): SectionData<VideoGame> {
    const [data, setData] = useState<VideoGame[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null)
        axios
            .get(`/api/video-games?categoria=${slug}`)
            .then(function (resp) {
                const data = resp.data.data;
                console.log("esta es la respuesta: ", JSON.stringify(data, null, 2));
                setData(data);
                setLoading(false);
            })
            .catch(function (err) {
                console.error(err);
                setError(err.response.data.message);
                setLoading(false);
            });
    }, [slug])

    return { data, loading, error };
}