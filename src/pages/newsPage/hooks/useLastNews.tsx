import axios from "axios";
import { useEffect, useState } from "react";

interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    slug: string;
    cantidadLikes: number;
    thumb: {
        id: number;
        title: string;
        url: string;
    };
}

interface NoticiaRetornada {
    news: Noticia | null;
    sortNews: Noticia[];
}
export const useLastNews = (): NoticiaRetornada => {
    const ENDPOINT = 'http://localhost:8000/api/noticias';
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [noticia, setNoticia] = useState<Noticia | null>(null);

    useEffect(() => {
        axios.get(ENDPOINT)
            .then(function (resp) {
                const noticiasList = resp.data.data;
                const sortNews = noticiasList.slice().sort((a: Noticia, b: Noticia) => {
                    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                setNoticias(sortNews);
                const lastNews = sortNews[0];
                setNoticia(lastNews)
            }).catch(function (err) {
                console.log(err)
            })
    }, [])

    return { news: noticia, sortNews: noticias }
}