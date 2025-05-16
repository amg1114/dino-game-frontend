import { HeroPost } from './components/HeroPost';
import { useLastPost } from './hooks/useBlog';
import { Pagination } from '../../components/pagination';
import { PostCard } from '../../components/PostCard';
import { usePageMetadata } from '../../hooks/usePageMetadata';

export function BlogPage() {
  const { post, relatedPosts, loading, page, setPage, itemsPerPage, totalItems } = useLastPost();

  usePageMetadata({
    title: 'Dino Noticias',
    description: 'Las últimas noticias de videojuegos, tecnología y entretenimiento.',
  });

  if (loading) return <p>Cargando Blog</p>;
  if (!post) return <p>No se encuentra la noticia</p>;

  return (
    <div className="mx-auto flex w-full flex-col">
      <div>
        <HeroPost title={post.titulo} description={post.descripcion} image={post.thumb.url} slug={post.slug} />
      </div>
      <section className="text-placeholder-2 mt-10 border-t pb-10">
        <h1 className="mt-10 mb-10 text-white">
          <span className="text-green font-bebas">Dino</span>noticias
        </h1>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {relatedPosts.map((noticia) => (
            <PostCard key={noticia.id} post={noticia} />
          ))}
        </div>

        <Pagination itemsPerPage={itemsPerPage} page={page} setPage={setPage} totalItems={totalItems} />
      </section>
    </div>
  );
}
