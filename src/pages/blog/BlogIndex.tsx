import { HeroNoticia } from './components/HeroNoticia';
import { useLastNews } from './hooks/useNews';
import { Pagination } from '../../components/pagination';
import { NewsCard } from '../../components/NewsCard';
import { usePageMetadata } from '../../hooks/usePageMetadata';

export function NewsPage() {
  const {
    news,
    relatedNews,
    loading,
    page,
    setPage,
    itemsPerPage,
    totalItems,
  } = useLastNews();


  usePageMetadata({
    title: 'Dino Noticias',
    description: 'Las últimas noticias de videojuegos, tecnología y entretenimiento.',
  });

  if (loading) return <p>Cargando Blog</p>;
  if (!news) return <p>No se encuentra la noticia</p>;

  return (
    <div className="mx-auto flex w-full flex-col">
      <div>
        <HeroNoticia title={news.titulo} description={news.descripcion} image={news.thumb.url} slug={news.slug} />
      </div>
      <section className="text-placeholder-2 mt-10 border-t pb-10">
        <h1 className="mt-10 mb-10 text-white">
          <span className="text-green font-bebas">Dino</span>noticias
        </h1>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {relatedNews.map((noticia) => (
            <NewsCard key={noticia.id} news={noticia} />
          ))}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          page={page}
          setPage={setPage}
          totalItems={totalItems} />
      </section>
    </div>
  );
}
