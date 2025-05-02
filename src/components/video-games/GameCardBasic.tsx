import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { GamePrice } from './GamePrice';

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
      <GamePrice videoGame={videoGame} />
    </article>
  );
}

export function GameCardBasicPlaceholder() {
  return (
    <article className="flex h-full flex-col">
      <header className="mb-3">
        <figure className="bg-placeholder animate-place-holder aspect-video w-full overflow-hidden rounded"></figure>
      </header>
      <span className="animate-place-holder bg-placeholder mb-2 block h-6 w-full"></span>
      <span className="animate-place-holder bg-placeholder block h-6 w-1/3"></span>
    </article>
  );
}
