import axios from "axios";
import { useEffect, useState } from "react"


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
    relatedNews: Noticia[];
    loading: boolean;
    error: string | null;

}
export const useNews = (slug: string): NoticiaRetornada => {
    const ENDPOINT = `http://localhost:8000/api/noticias/noticia/${slug}`;
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('slug de noticia ', slug);

        setLoading(true)
        axios.get(ENDPOINT)
            .then(function (resp) {
                const news_data = resp.data;
                axios.get('http://localhost:8000/api/noticias')
                    .then(function (resp) {
                        const allNews = resp.data.data;
                        const filteredNews = allNews.filter((news: Noticia) => news.id !== news_data.id);

                        setNoticias(filteredNews);
                        setNoticia(news_data);
                        setLoading(false);
                    }).catch(function (err) {
                        console.log('hubo un error', err);
                        setError(err.message || 'error al cargar noticia')
                        setLoading(false);
                    })
            }).catch(function (err) {
                console.log('hubo un error', err);
                setError(err.message || 'error al cargar la noticia')
                setLoading(false);
            });
    }, [slug])

    return { news: noticia, relatedNews: noticias, loading, error };
}