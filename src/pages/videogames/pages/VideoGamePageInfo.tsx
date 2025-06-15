import { AssetsSlider } from '../components/videogames/AssetsSlider';
import { Calification } from '../components/videogame/Calification';
import { GamePrice } from '../../../components/video-games/GamePrice';
import { CommentsSection } from '../components/videogame/CommentsSection';
import { useVideoGameInfo } from '../hooks/videogame/useVideoGameInfo';
import { Requisito } from '../../../models/requisitos.interface';
import { Categoria } from '../../../models/categoria.interface';
import { Outlet } from 'react-router';
import { GamePageContext } from '@utils/context/gamePageContext';

export function VideoGamePageInfo() {
  const videoGameInfo = useVideoGameInfo();
  if (!videoGameInfo) return null;
  const { game, fechaFormateada, fetchData } = videoGameInfo;
  return (
    <>
      {game ? (
        <>
          <AssetsSlider videoGame={game} />
          <div className="mt-8 flex w-full flex-col justify-between gap-x-10 gap-y-3 sm:flex-row xl:w-4/5">
            <div className="mb-2 w-full">
              <div className="border-b-placeholder flex w-full flex-col-reverse border-b-2 pb-4 xl:flex-row">
                <p>
                  {fechaFormateada.toUpperCase()} <span className="opacity-20">&#124; </span>
                  {game.developer.nombre} <span className="opacity-20">&#124; </span>
                  {game.versions.length > 0 ? (
                    <>
                      {' '}
                      ({game.versions[0].version}) <span className="opacity-20">&#124; </span>
                    </>
                  ) : (
                    <></>
                  )}
                </p>
                <span className="md:ml-1">{<Calification game={game} />}</span>
              </div>
              <div className="border-b-placeholder w-full border-b-2 pb-4">
                <h2 className="mt-2 uppercase">Descripción</h2>
                <p>{game.descripcion}</p>
              </div>
              <div className="mt-2 hidden w-full sm:block">
                <CommentsSection comentarios={game.comentarios} fetchData={fetchData} />
              </div>
            </div>
            <div className="flex w-full items-start justify-center sm:max-w-60 sm:justify-end">
              <div
                className={`flex w-full flex-col items-start justify-center ${game.descuentos.length > 0 ? 'mt-2 sm:mt-8' : ''}`}
              >
                <GamePrice
                  videoGame={game}
                  buttonClasses="w-full flex-1 h-8 text-lg flex items-center justify-center "
                  currencyLabel="COP"
                  wrapperClasses="w-full h-8 items-center justify-center"
                  textClasses="text-md flex items-center w-full"
                  toBuyForm
                />
                {game.versions.length > 0 && game.versions[0].requisitos.length > 0 ? (
                  <>
                    <h3 className="uppdercase mt-4">Requisitos</h3>
                    {
                      <div className="flex flex-wrap gap-2">
                        {game.versions[0].requisitos.map((requisito: Requisito, index: number) => (
                          <p key={index} className="secondary-button w-fit">
                            {requisito.requisito}
                          </p>
                        ))}
                      </div>
                    }
                  </>
                ) : (
                  <></>
                )}

                {game.categorias.length > 0 ? (
                  <>
                    <h3 className="uppdercase mt-4">Categorías</h3>
                    {
                      <div className="border-b-placeholder sm:ob-0 mt-3 flex w-full flex-wrap gap-2 border-b-2 pb-4 sm:border-none">
                        {game.categorias.map((categoria: Categoria, index: number) => (
                          <p key={index} className="thertiary-button w-fit">
                            {categoria.titulo}
                          </p>
                        ))}
                      </div>
                    }
                  </>
                ) : (
                  <></>
                )}
                <div className="block w-full sm:hidden">
                  <CommentsSection comentarios={game.comentarios} fetchData={fetchData} />
                </div>
              </div>
            </div>
            <GamePageContext.Provider value={{ game }}>
              <Outlet />
            </GamePageContext.Provider>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
