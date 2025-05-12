import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { Download, Trash } from 'lucide-react';

interface GameCardBasicProps {
  videoGame: VideoGame;
  wrapperExtraClasses?: string;
}

export function UserGame({ videoGame, wrapperExtraClasses }: GameCardBasicProps) {
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
                to={`/categoria/${categoria.slug}`}
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
        <button
          type="button"
          className="primary-button primary-button--sm flex w-full! items-center justify-center gap-2 lg:w-fit!"
        >
          <Download />
          Descargar
        </button>
        <button
          type="button"
          className="secondary-button secondary-button--sm hover:bg-red! flex w-full! items-center justify-center gap-2 lg:w-fit!"
        >
          <Trash />
          Eliminar
        </button>
      </div>
    </article>
  );
}
