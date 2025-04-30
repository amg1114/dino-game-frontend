import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { formatPrice } from '../../utils/formatPrice';

interface GameCardBasicProps {
  videoGame: VideoGame;
}

export function GameCardBasic({ videoGame }: GameCardBasicProps) {
  return (
    <article className="flex h-full flex-col">
      <header className="mb-3">
        <figure className="bg-placeholder aspect-video w-full overflow-hidden rounded">
          <img src={videoGame.thumb.url} alt={videoGame.thumb.title} />
        </figure>
      </header>
      <h4 className="leading-none">{videoGame.titulo}</h4>
      <ul className="mb-2 flex flex-wrap gap-2">
        {videoGame.categorias.length ? (
          videoGame.categorias.map((categoria) => (
            <li className="list-none leading-none" key={categoria.id}>
              <Link
                to={`/categoria/${categoria.slug}`}
                className="hover:text-green relative z-20 text-xs leading-none text-white uppercase underline"
              >
                {categoria.titulo}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-xs">No hay categorías relacionadas</li>
        )}
      </ul>
      <Link to={`/video-games/${videoGame.slug}`} className="primary-button primary-button--xs mt-auto w-fit">
        {formatPrice(videoGame.precio)}
      </Link>
    </article>
  );
}
