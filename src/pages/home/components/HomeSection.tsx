import React from 'react';
import { HomeSectionData } from '../hooks/useHomePage';
import { GameCardBasic, GameCardBasicPlaceholder } from '../../../components/video-games/GameCardBasic';
import { GameCardDescription } from '../../../components/video-games/GameCardDescription';

interface HomeSectionProps {
  title: string | React.ReactNode;
  data: HomeSectionData;
}

export function HomeSection({ title, data }: HomeSectionProps) {
  const { loading, error, data: games } = data;
  return (
    <section className="border-t-placeholder space-y-9 border-t pt-9 first:border-t-0 first:pt-0">
      <h2>
        <span className="text-green">Dino</span>
        {title}
      </h2>
      {error && <p>Error: {error}</p>}

      {loading && (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <GameCardBasicPlaceholder key={index} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-9">
          <div className="grid grid-cols-3 gap-4">
            {games.slice(0, 3).map((videoGame) => (
              <GameCardDescription key={videoGame.id} videoGame={videoGame} />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {games.slice(3).map((videoGame) => (
              <GameCardBasic key={videoGame.id} videoGame={videoGame} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
