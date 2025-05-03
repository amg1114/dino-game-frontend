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
        <section className="flex items-start gap-4">
          <div className="bg-placeholder relative aspect-video h-auto flex-1 overflow-hidden rounded-lg">
            <figure className="relative z-0 w-full">
              <img src={videoGames[currentIndex].thumb.url} alt={videoGames[currentIndex].titulo} className="w-full" />
            </figure>
            <div className="absolute bottom-0 left-0 z-10 p-8 md:max-w-2/3">
              <h2>{videoGames[currentIndex].titulo}</h2>
              <p className="mb-4 text-lg">{videoGames[currentIndex].descripcion}</p>
              <GamePrice videoGame={videoGames[currentIndex]} />
            </div>
            <span className="to-body/70 absolute inset-0 z-0 h-full w-full bg-linear-to-b from-transparent"></span>
          </div>

          <div className="grid w-full grid-cols-1 grid-rows-4 gap-4 md:max-w-44 md:flex-col xl:max-w-1/6">
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
                  {game.titulo}
                  <span className="absolute inset-0"></span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
