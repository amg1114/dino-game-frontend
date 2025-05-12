import clsx from 'clsx';
import { StSoldVideoGame } from '../../../../models/statistics.interface';
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';

export function SoldGameWidget({
  game,
  type,
  unit,
}: {
  game: StSoldVideoGame;
  type: 'best' | 'worst';
  unit: 'mes' | 'año';
}) {
  return (
    <article className="bg-placeholder space-y-4 rounded p-6">
      <h4>{game.titulo}</h4>
      <span className="font-bebas bg-placeholder-2 flex w-fit items-center gap-4 rounded px-3 py-1 text-xl">
        <span className="text-4xl">{game.sales}</span>
        <span
          className={clsx({
            'text-green': type === 'best',
            'text-red': type === 'worst',
          })}
        >
          {type === 'best' ? <ArrowUpNarrowWide /> : <ArrowDownNarrowWide />}
        </span>
      </span>
      <p>
        Juego con {type === 'best' ? 'más' : 'menos'} <br /> ventas del {unit}
      </p>
    </article>
  );
}
