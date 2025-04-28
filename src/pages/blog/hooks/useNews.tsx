import axios from "axios";
import { useEffect, useState } from "react"
import { News } from "../../../models/news.interface";
interface NoticiaRetornada {
    news: News | null;
    relatedNews: News[];
    loading: boolean;
}
export const useNews = (slug: string): NoticiaRetornada => {
    const ENDPOINT = `/api/noticias/noticia/${slug}`;
    const [news, setNews] = useState<News | null>(null);
    const [newss, setNewss] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        axios.get(ENDPOINT)
            .then(function (resp) {
                const news_data = resp.data;
                axios.get('http://localhost:8000/api/noticias')
                    .then(function (resp) {
                        const allNews = resp.data.data;
                        const sortNews = allNews.slice().sort((a: News, b: News) => {
                            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                        });
                        const filteredNews = sortNews.filter((news: News) => news.id !== news_data.id);

                        setNewss(filteredNews);
                        setNews(news_data);
                        setLoading(false);
                    }).catch(function (err) {
                        console.error(err);
                        setLoading(false);
                    })
            }).catch(function (err) {
                console.error(err);
                setLoading(false);
            });
    }, [slug])

    return { news: news, relatedNews: newss, loading };
}