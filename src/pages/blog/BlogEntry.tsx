import { useParams } from 'react-router';
import { useBlog } from './hooks/useBlog';
import { Heart } from 'lucide-react';
import { PostCard } from '../../components/PostCard';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { truncateDescription } from '../../utils/truncateDescription';
import { useAuth } from '@hooks/useAuth';
import axios from 'axios';

export function BlogEntry() {
  const { slug } = useParams<{ slug: string }>();
  const { post, relatedPosts, loading } = useBlog(slug || '');
  const { usuario, getUsuario } = useAuth();

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
  const isLiked = !!usuario && (usuario.likes ?? []).some((like) => like.noticiaID === post.id);
  const handleLike = () => {
    if (isLiked) {
      axios
        .delete(`/api/likes/${post.id}`)
        .then(() => {
          getUsuario();
        })
        .catch((error) => {
          console.error('Error al eliminar el like:', error);
        });

      post.cantidadLikes -= 1;

      return;
    }

    post.cantidadLikes += 1;
    axios
      .post(`/api/likes/${post.id}`)
      .then(() => {
        getUsuario();
      })
      .catch((error) => {
        console.error('Error al eliminar el like:', error);
      });
  };

  const fechaFormateada = `${mesCapitalizado} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div>
      <div className="mx-auto w-full md:w-[80%] lg:w-1/2">
        <div className="flex aspect-[16/9] w-full max-w-[90%] flex-col sm:min-w-[90%]">
          <img className="rounded-xl" src={post.thumb?.url} alt="news image" />
          <div className="mt-4 flex flex-row justify-start text-base md:w-2/3">
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
              <button
                className="fill-placeholder-2 stroke-placeholder-2 group flex cursor-pointer items-center gap-1 pr-1 leading-none"
                onClick={() => handleLike()}
              >
                {isLiked && <Heart fill="#3dab7b" color="#3dab7b" className={!isLiked ? '' : ''} />}
                {!isLiked && <Heart />}
                <span className="text-sm leading-none text-white">{post.cantidadLikes}</span>
              </button>
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
