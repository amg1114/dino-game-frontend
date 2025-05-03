import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { formatPrice } from '../../utils/formatPrice';

export function GamePrice({
  videoGame,
  wrapperClasses,
  buttonClasses,
  textClasses,
}: {
  videoGame: VideoGame;
  wrapperClasses?: string;
  buttonClasses?: string;
  textClasses?: string;
}) {
  const { descuentos, slug, precio } = videoGame;
  return (
    <footer className={`flex flex-wrap-reverse ${wrapperClasses}`}>
      {descuentos.length === 0 && (
        <Link to={`/video-games/${slug}`} className="primary-button primary-button--xs mt-auto w-fit">
          {formatPrice(precio)}
        </Link>
      )}

      {descuentos.length > 0 && (
        <div className="flex flex-wrap-reverse items-center gap-2">
          <Link
            to={`/video-games/${slug}`}
            className={`primary-button primary-button--xs mt-auto w-fit ${buttonClasses}`}
          >
            - {descuentos[0].porcentaje * 100}%
          </Link>

          <p className={textClasses}>
            <del className="pr-2 opacity-70">{formatPrice(precio)}</del>
            <span>{formatPrice(precio * (1 - descuentos[0].porcentaje))}</span>
          </p>
        </div>
      )}
    </footer>
  );
}
