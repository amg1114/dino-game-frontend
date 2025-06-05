import { useParams } from 'react-router';
import { useBlog } from './hooks/useBlog';
import { Heart } from 'lucide-react';
import { PostCard } from '../../components/PostCard';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { truncateDescription } from '../../utils/truncateDescription';

export function BlogEntry() {
  const { slug } = useParams<{ slug: string }>();
  const { post, relatedPosts, loading } = useBlog(slug || '');

  usePageMetadata({
    title: post?.titulo || 'Loading',
    description: truncateDescription(post?.descripcion || ''),
    image: post?.thumb.url,
  });

  if (loading) return <p>Cargando noticia...</p>;
  if (!post) return <p>No se encontró la noticia</p>;

  const date = new Date(post.fecha);
  const opcionesMes = { month: 'long' } as const;
  const mes = date.toLocaleDateString('es-ES', opcionesMes);

  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

  const fechaFormateada = `${mesCapitalizado} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div>
      <div className="mx-auto w-full md:w-[80%] lg:w-1/2">
        <div className="flex aspect-[16/9] w-full max-w-[90%] flex-col sm:min-w-[90%]">
          <img className="rounded-xl" src={post.thumb?.url} alt="news image" />
          <div className="mt-4 flex flex-row justify-start text-sm md:w-2/3">
            <time
              dateTime={post.fecha}
              className="font-roboto border-r-placeholder-2 border-r-2 pr-2 leading-none text-white"
            >
              {fechaFormateada}
            </time>
            <p className="font-roboto border-r-placeholder-2 border-r-2 px-2 leading-none text-white">
              {post.autor.nombre}
            </p>
            <div className="flex flex-row items-center px-2">
              <span className="fill-placeholder-2 stroke-placeholder-2 pr-1 text-xs leading-none">
                <Heart />
              </span>
              <span className="text-sm leading-none text-white">{post.cantidadLikes}</span>
            </div>
          </div>
          <h1 className="mt-2 w-auto text-4xl leading-tight">{post.titulo}</h1>
          <div className="rich-text w-full" dangerouslySetInnerHTML={{ __html: post.descripcion }}></div>
        </div>
      </div>

      <div className="text-placeholder-2 mt-5 border-t pt-5">
        <h2 className="mb-2 text-white">
          <span className="text-green font-bebas uppercase">dino</span>
          noticias recientes
        </h2>

        <div className="mt-5 flex grid-cols-3 space-x-4 overflow-visible overflow-x-auto px-2 md:grid">
          {relatedPosts.slice(0, 3).map((item) => (
            <div key={item.id} className="max-w-[90%] min-w-[90%] flex-shrink-0">
              <PostCard post={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
