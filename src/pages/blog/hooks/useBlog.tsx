import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../../../models/post.interface';
import { usePagination } from '../../../hooks/usePagination';

interface NoticiaRetornada {
  post: Post | null;
  relatedPosts: Post[];
  loading: boolean;
}
export const useBlog = (slug: string): NoticiaRetornada => {
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/noticias/noticia/${slug}`)
      .then(function (resp) {
        const post_data = resp.data;
        axios
          .get('/api/noticias?limit=4')
          .then(function (resp) {
            const all_posts = resp.data.data;
            const sort_posts = all_posts.slice().sort((a: Post, b: Post) => {
              return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
            });
            const filtered_posts = sort_posts.filter((post: Post) => post.id !== post_data.id);

            setPosts(filtered_posts);
            setPost(post_data);
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

  return { post: post, relatedPosts: posts, loading };
};

interface NoticiaRetornadaIndex {
  post: Post | null;
  relatedPosts: Post[];
  loading: boolean;
  page: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  totalItems: number;
}
export const useLastPost = (): NoticiaRetornadaIndex => {
  const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 3, windowWidth: 768 }], 9);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState(0);
  const ENDPOINT = `/api/noticias?limit=${itemsPerPage}&offset=${page}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINT)
      .then(function (resp) {
        const postsList = resp.data.data;
        setTotalItems(resp.data.total);
        const sortPosts = postsList.slice().sort((a: Post, b: Post) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });
        const lastPost = sortPosts[0];
        const filteredNews = sortPosts.filter((news: Post) => news.id !== lastPost.id);
        setPosts(filteredNews);
        setPost(lastPost);
        setLoading(false);
      })
      .catch(function (err) {
        console.error(err);
        setLoading(false);
      });
  }, [page, itemsPerPage]);

  return { post: post, relatedPosts: posts, loading, page, itemsPerPage, setPage, totalItems };
};
