import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { Download, Trash } from 'lucide-react';
import { useAlert } from '@hooks/useAlert';
import axios from 'axios';

interface GameCardBasicProps {
  videoGame: VideoGame;
  wrapperExtraClasses?: string;
  onDelete?: () => void;
}

export function UserGame({ videoGame, wrapperExtraClasses, onDelete }: GameCardBasicProps) {
  const { showAlert, showToast } = useAlert();

  const handleDelete = () => {
    showAlert({
      type: 'warning',
      title: 'Eliminar juego',
      message: `¿Estás seguro de que deseas eliminar ${videoGame.titulo} de tu biblioteca?`,
      isConfirm: true,
      onClose(confirm) {
        if (confirm) {
          axios
            .delete(`/api/video-games/biblioteca/${videoGame.id}`)
            .then(() => {
              showToast({
                type: 'success',
                message: 'El juego ha sido eliminado de tu biblioteca.',
              });
              if (onDelete) {
                onDelete();
              }
            })
            .catch((error) => {
              console.error('Error al eliminar el juego:', error);
              showToast({
                type: 'error',
                message: 'No se pudo eliminar el juego. Por favor, inténtalo más tarde.',
              });
            });
          return;
        }

        showToast({
          type: 'info',
          message: 'El juego no ha sido eliminado.',
        });
      },
    });
  };

  return (
    <article className={`flex h-full flex-col ${wrapperExtraClasses}`}>
      <header className="mb-3">
        <figure className="bg-placeholder aspect-video w-full overflow-hidden rounded">
          <img src={videoGame.thumb.url} alt={videoGame.thumb.title} />
        </figure>
      </header>
      <h4 className="text-xl leading-none md:text-2xl">{videoGame.titulo}</h4>
      <ul className="mb-2 flex flex-wrap gap-2">
        {videoGame.categorias.length ? (
          videoGame.categorias.map((categoria) => (
            <li className="list-none leading-none" key={categoria.id}>
              <Link
                to={`/categorias/${categoria.slug}`}
                className="hover:text-green relative z-20 text-xs leading-none text-white uppercase not-hover:no-underline"
              >
                {categoria.titulo}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-xs">No hay categorías relacionadas</li>
        )}
      </ul>
      <div className="mt-2 flex flex-wrap items-center justify-end gap-4">
        <a
          type="button"
          className="primary-button primary-button--sm flex w-full! items-center justify-center gap-2 lg:w-fit!"
          href={videoGame.versions[0]?.file?.url || '#'}
        >
          <Download />
          Descargar
        </a>
        <button
          type="button"
          className="secondary-button secondary-button--sm hover:bg-red! flex w-full! items-center justify-center gap-2 lg:w-fit!"
          onClick={handleDelete}
        >
          <Trash />
          Eliminar
        </button>
      </div>
    </article>
  );
}
