import { Link } from 'react-router';
import { VideoGame } from '../../models/video-game.interface';
import { formatPrice } from '../../utils/formatPrice';
import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';

export function GamePrice({
  videoGame,
  wrapperClasses,
  buttonClasses,
  textClasses,
  currencyLabel,
  toBuyForm,
}: {
  videoGame: VideoGame;
  wrapperClasses?: string;
  buttonClasses?: string;
  textClasses?: string;
  currencyLabel?: string;
  toBuyForm?: boolean;
}) {
  const { descuentos, slug, precio } = videoGame;
  const [url, setUrl] = useState(`/juegos/${slug}`);
  const [hasGame, setGame] = useState(false);
  const { hasVideoGame } = useAuth();

  useEffect(() => {
    setGame(hasVideoGame(videoGame.id));
  }, [slug, toBuyForm, hasVideoGame, videoGame.id]);

  useEffect(() => {
    if (toBuyForm && !hasGame) {
      setUrl(`/juegos/${slug}/comprar`);
    } else if (hasGame) {
      setUrl(`/perfil/biblioteca`);
    } else {
      setUrl(`/juegos/${slug}`);
    }
  }, [slug, toBuyForm, hasGame]);

  return (
    <footer className={`flex w-fit flex-wrap-reverse ${wrapperClasses}`}>
      {!hasGame ? (
        <>
          {descuentos.length === 0 && (
            <Link to={url} className={`primary-button primary-button--xs mt-auto w-full flex-1 ${buttonClasses}`}>
              {formatPrice(precio)}
              {currencyLabel && precio > 0 && <span className="ml-1">{currencyLabel}</span>}
            </Link>
          )}

          {descuentos.length > 0 && (
            <div className="flex w-full flex-wrap-reverse items-center gap-2">
              <Link to={url} className={`primary-button primary-button--xs mt-auto ${buttonClasses}`}>
                - {descuentos[0].porcentaje * 100}%
                {currencyLabel && precio > 0 && <span className="ml-2 uppercase">comprar</span>}
              </Link>
              <p className={textClasses}>
                <del className="pr-2 opacity-70">{formatPrice(precio)}</del>
                <span>
                  {formatPrice(precio * (1 - descuentos[0].porcentaje))}{' '}
                  {currencyLabel && precio > 0 && <span>{currencyLabel}</span>}
                </span>
              </p>
            </div>
          )}
        </>
      ) : (
        <Link to={url} className={`primary-button primary-button--xs mt-auto w-full flex-1 ${buttonClasses}`}>
          Adquirido
        </Link>
      )}
    </footer>
  );
}
