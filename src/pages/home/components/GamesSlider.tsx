import { useEffect, useRef, useState } from 'react';
import { VideoGame } from '../../../models/video-game.interface';
import { SectionData } from '../hooks/useHomePage';
import { GamePrice } from '../../../components/video-games/GamePrice';

export function GamesSlider({ data }: { data: SectionData<VideoGame> }) {
  const { data: videoGames, loading, error } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    resetTimeout();
    if (videoGames.length) {
      timeOut.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videoGames.length);
      }, 5000);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, videoGames.length]);

  const resetTimeout = () => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    }
  };

  const handleSelectGame = (index: number) => {
    resetTimeout();
    setCurrentIndex(index);
  };

  return (
    <>
      {loading && <p>Loading...</p>}

      {error && <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay juegos disponibles</p>}

      {!loading && !error && videoGames.length && (
        <section className="flex flex-wrap items-start gap-4">
          <div className="md:bg-placeholder relative h-auto w-full overflow-hidden rounded-lg md:aspect-video xl:flex-1">
            <figure className="relative z-0 w-full">
              <img src={videoGames[currentIndex].thumb.url} alt={videoGames[currentIndex].titulo} className="w-full" />
            </figure>
            <div className="absolute bottom-0 left-0 z-10 max-w-2/3 p-8 max-md:hidden">
              <h2 className="leading-none">{videoGames[currentIndex].titulo}</h2>
              <p className="mb-4 text-lg">{videoGames[currentIndex].descripcion}</p>
              <GamePrice videoGame={videoGames[currentIndex]} />
            </div>
            <span className="to-body/70 absolute inset-0 z-0 h-full w-full bg-linear-to-b from-transparent max-md:hidden"></span>
          </div>

          <div className="grid w-full grid-cols-4 gap-1.5 md:gap-4 xl:max-w-1/6 xl:grid-cols-1 xl:grid-rows-4">
            {videoGames.map((game, index) => (
              <div className="group font-oswald relative flex flex-col gap-2" key={game.id}>
                <figure className="bg-placeholder relative aspect-video h-auto w-full overflow-hidden rounded">
                  <img src={game.thumb.url} alt={game.titulo} className="w-full" />

                  <span
                    className={`bg-green absolute bottom-0 left-0 h-1 w-0 transition-all ease-linear ${
                      index === currentIndex ? 'w-full! duration-[5000ms]' : ''
                    }`}
                  ></span>
                </figure>

                <button
                  className="hover:text-green cursor-pointer text-center text-sm transition-colors"
                  onClick={() => handleSelectGame(index)}
                >
                  <span className="max-md:hidden">{game.titulo}</span>
                  <span className="absolute inset-0"></span>
                </button>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col md:hidden">
            <h2 className="mb-2.5 text-3xl leading-none">{videoGames[currentIndex].titulo}</h2>
            <p className="mb-2">{videoGames[currentIndex].descripcion}</p>
            <GamePrice videoGame={videoGames[currentIndex]} />
          </div>
        </section>
      )}
    </>
  );
}
