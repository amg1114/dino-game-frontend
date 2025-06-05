import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { GamePrice } from './GamePrice';
import { AdminPermissions } from '../../pages/dashboard/video-games/hooks/useDashboardGames';
import { Edit, Eye, PercentSquare, Trash2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

interface GameCardBasicProps {
  videoGame: VideoGame;
  adminPermissions?: AdminPermissions;
  wrapperExtraClasses?: string;
  onDelete?: (videoGame: VideoGame) => void;
}

export function GameCardBasic({ videoGame, wrapperExtraClasses, adminPermissions, onDelete }: GameCardBasicProps) {
  const [loading, setLoading] = useState(true);
  return (
    <article className={`flex h-full flex-col ${wrapperExtraClasses}`}>
      <header className="mb-3">
        <Link to={`/juegos/${videoGame.slug}`} className="block">
          <figure
            className={clsx('bg-placeholder aspect-video w-full overflow-hidden rounded', {
              'animate-place-holder': loading,
            })}
          >
            <img
              onLoad={() => setLoading(false)}
              src={videoGame.thumb.url}
              alt={videoGame.thumb.title}
              className={clsx('h-full w-full object-cover transition-opacity', {
                'opacity-0': loading,
                'opacity-100': !loading,
              })}
            />
          </figure>
        </Link>
      </header>
      <h4 className="text-xl leading-none md:text-2xl">
        <Link to={`/juegos/${videoGame.slug}`} className="text-white no-underline hover:text-white/30">
          {videoGame.titulo}
        </Link>
      </h4>
      <ul className="mb-2 flex flex-wrap gap-2">
        {videoGame.categorias && videoGame.categorias.length ? (
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
      {!adminPermissions && <GamePrice videoGame={videoGame} />}

      {adminPermissions && (
        <footer className="flex flex-wrap gap-2">
          <Link
            to={`/juegos/${videoGame.slug}`}
            className="bg-blue flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
          >
            <Eye />
          </Link>

          {adminPermissions.canEdit && (
            <Link
              to={`/dashboard/juegos/${videoGame.slug}/editar`}
              className="bg-green flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
            >
              <Edit />
            </Link>
          )}

          {adminPermissions.canAddDiscounts && (
            <Link
              to={`/dashboard/juegos/${videoGame.slug}/descuentos`}
              className="bg-yellow flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
            >
              <PercentSquare />
            </Link>
          )}

          {adminPermissions.canDelete && (
            <button
              type="button"
              onClick={() => (onDelete ? onDelete(videoGame) : undefined)}
              className="bg-red flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
            >
              <Trash2 />
            </button>
          )}
        </footer>
      )}
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
