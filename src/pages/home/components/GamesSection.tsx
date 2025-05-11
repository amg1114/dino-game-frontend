import React from 'react';
import { SectionData } from '../hooks/useHomePage';
import { GameCardBasic, GameCardBasicPlaceholder } from '../../../components/video-games/GameCardBasic';
import { GameCardDescription } from '../../../components/video-games/GameCardDescription';
import { VideoGame } from '../../../models/video-game.interface';

interface GamesSectionProps {
  title: string | React.ReactNode;
  data: SectionData<VideoGame>;
}

export function GamesSection({ title, data }: GamesSectionProps) {
  const { loading, error, data: games } = data;
  console.log('Estado de data en GamesSection:', games);
  return (
    <section className="border-t-placeholder space-y-9 border-t pt-9 first:border-t-0 first:pt-0">
      <h2>
        <span className="text-green">Dino</span>
        {title}
      </h2>
      {error && <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay juegos disponibles</p>}

      {loading && (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <GameCardBasicPlaceholder key={index} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-9">
          <div className="flex h-full grid-cols-3 gap-4 overflow-auto md:grid">
            {games.map((videoGame, index) => (
              <GameCardDescription
                wrapperExtraClasses={`min-w-64 ${index > 2 ? 'md:hidden' : ''}`}
                key={videoGame.id}
                videoGame={videoGame}
              />
            ))}
          </div>
          <div className="hidden grid-cols-4 gap-4 md:grid">
            {games.slice(3).map((videoGame) => (
              <GameCardBasic key={videoGame.id} videoGame={videoGame} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
