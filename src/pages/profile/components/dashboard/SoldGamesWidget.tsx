import clsx from 'clsx';
import { Sales } from '../../../../models/statistics.interface';
import { normalizeSoldGamesData } from '../../../../utils/statistics';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function SoldGamesWidget({
  currentSales,
  prevSales,
  timeUnit,
}: {
  currentSales: Sales;
  prevSales: Sales;
  timeUnit: 'mes' | 'año';
}) {
  const { soldGames, difference, percent, isMajor } = normalizeSoldGamesData(currentSales, prevSales);

  return (
    <article className="bg-placeholder space-y-4 rounded p-6">
      <h4>Juegos Vendidos</h4>

      <div className="font-bebas flex gap-4 text-xl">
        <span className="text-4xl">{soldGames}</span>
        <span
          className={clsx({
            'text-green': isMajor,
            'text-red': !isMajor,
            'bg-placeholder-2 flex items-center gap-2 rounded px-3': true,
          })}
        >
          {isMajor ? <TrendingUp /> : <TrendingDown />}
          <span className="text-white">{percent}</span>%
        </span>
      </div>

      <p>
        Se {difference > 1 ? 'vendieron' : 'vendió'} <strong>{difference}</strong> {difference > 1 ? 'juegos' : 'juego'}{' '}
        {isMajor ? 'más' : 'menos'} que el {timeUnit} pasado
      </p>
    </article>
  );
}
