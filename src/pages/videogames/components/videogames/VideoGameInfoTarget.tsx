import { Link } from 'react-router';
import { VideoGame } from '../../../../models/video-game.interface';
import { GamePrice } from '../../../../components/video-games/GamePrice';

export function VideoGameInfoTarget({ videoGame }: { videoGame: VideoGame }) {
  const { titulo, slug, thumb } = videoGame;
  return (
    <Link to={`/juegos/${slug}`} className="hover:bg-placeholder-2 flex gap-4 px-2 py-3 align-top no-underline">
      <img src={thumb.url} alt={`${thumb.title}-image`} className="h-24 w-30 sm:w-30 md:w-40" />
      <div className="flex h-24 flex-col items-start justify-between p-0.5">
        <h4 className="decoration-none -m-1 ml-0.5 self-start p-0 text-lg text-white lg:text-2xl">{titulo}</h4>
        <GamePrice videoGame={videoGame} wrapperClasses="text-white w-10 sm:w-22 gap-1 p-0.5 text-center" />
      </div>
    </Link>
  );
}
