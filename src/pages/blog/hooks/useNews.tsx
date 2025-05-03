import axios from 'axios';
import { useEffect, useState } from 'react';
import { News } from '../../../models/news.interface';

interface NoticiaRetornada {
  news: News | null;
  relatedNews: News[];
  loading: boolean;
}
export const useNews = (slug: string): NoticiaRetornada => {
  const [news, setNews] = useState<News | null>(null);
  const [newss, setNewss] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/noticias/noticia/${slug}`)
      .then(function (resp) {
        const news_data = resp.data;
        axios
          .get('/api/noticias?limit=4')
          .then(function (resp) {
            const allNews = resp.data.data;
            const sortNews = allNews.slice().sort((a: News, b: News) => {
              return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
            });
            const filteredNews = sortNews.filter((news: News) => news.id !== news_data.id);

            setNewss(filteredNews);
            setNews(news_data);
            setLoading(false);
          })
          .catch(function (err) {
            console.error(err);
            setLoading(false);
          });
      })
      .catch(function (err) {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  return { news: news, relatedNews: newss, loading };
};

export const useLastNews = (): NoticiaRetornada => {
  const ENDPOINT = '/api/noticias';
  const [newss, setNewss] = useState<News[]>([]);
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINT)
      .then(function (resp) {
        const noticiasList = resp.data.data;
        const sortNews = noticiasList.slice().sort((a: News, b: News) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });
        const lastNews = sortNews[0];
        const filteredNews = sortNews.filter((news: News) => news.id !== lastNews.id);
        setNewss(filteredNews);
        setNews(lastNews);
        setLoading(false);
      })
      .catch(function (err) {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return { news: news, relatedNews: newss, loading };
};
