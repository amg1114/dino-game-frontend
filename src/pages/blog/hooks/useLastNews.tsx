import axios from "axios";
import { useEffect, useState } from "react";
import { News } from "../../../models/news.interface";

interface NoticiaRetornada {
    news: News | null;
    sortNews: News[];
}
export const useLastNews = (): NoticiaRetornada => {
    const ENDPOINT = 'http://localhost:8000/api/noticias';
    const [newss, setNewss] = useState<News[]>([]);
    const [news, setNews] = useState<News | null>(null);

    useEffect(() => {
        axios.get(ENDPOINT)
            .then(function (resp) {
                const noticiasList = resp.data.data;
                const sortNews = noticiasList.slice().sort((a: News, b: News) => {
                    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
                setNewss(sortNews);
                const lastNews = sortNews[0];
                setNews(lastNews)
            }).catch(function (err) {
                console.error(err)
            })
    }, [])

    return { news: news, sortNews: newss }
}