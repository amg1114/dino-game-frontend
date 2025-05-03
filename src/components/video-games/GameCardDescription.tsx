import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { truncateDescription } from '../../utils/truncateDescription';
import { GamePrice } from './GamePrice';

interface GameCardDescriptionProps {
  videoGame: VideoGame;
  wrapperExtraClasses?: string;
}

export function GameCardDescription({ videoGame, wrapperExtraClasses }: GameCardDescriptionProps) {
  return (
    <article className={`flex h-full flex-col ${wrapperExtraClasses}`}>
      <header className="mb-3">
        <figure className="bg-placeholder aspect-video w-full overflow-hidden rounded">
          <img src={videoGame.thumb.url} alt={videoGame.thumb.title} />
        </figure>
      </header>
      <div className="mb-auto flex flex-col gap-2">
        <h4 className="text-xl leading-none md:text-2xl">{videoGame.titulo}</h4>
        <p className="text-sm">
          <span className="max-md:hidden">{truncateDescription(videoGame.descripcion)}</span>
          <span className="md:hidden">{truncateDescription(videoGame.descripcion, 100)}</span>
        </p>
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
      </div>
      <GamePrice videoGame={videoGame} />
    </article>
  );
}
