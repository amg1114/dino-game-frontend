import clsx from 'clsx';
import { UnitSales } from '../../../models/statistics.interface';
import { DashboardUnit, normalizeSoldGamesData } from '../../../utils/statistics';
import { Equal, TrendingDown, TrendingUp } from 'lucide-react';

export function SoldGamesWidget({ data, timeUnit }: { data: UnitSales; timeUnit: DashboardUnit }) {
  const { soldGames, difference, percent, delta } = normalizeSoldGamesData(data);

  return (
    <article className="bg-placeholder space-y-4 rounded p-6">
      <h4>Juegos Vendidos</h4>

      <div className="font-bebas flex gap-4 text-xl">
        <span className="text-4xl">{soldGames}</span>
        <span
          className={clsx({
            'text-green': delta === 'increase',
            'text-red': delta === 'decrease',
            'bg-placeholder-2 flex items-center gap-2 rounded px-3': true,
          })}
        >
          {delta === 'increase' ? <TrendingUp /> : delta === 'decrease' ? <TrendingDown /> : <Equal />}
          <span className="text-white">{percent}</span>%
        </span>
      </div>

      {delta !== 'same' && (
        <p>
          Se {difference > 1 ? 'vendieron' : 'vendió'} <strong>{difference}</strong>{' '}
          {difference > 1 ? 'juegos' : 'juego'} {delta === 'increase' ? 'más' : 'menos'} que el {timeUnit} pasado
        </p>
      )}
      {delta === 'same' && <p>Se vendió la misma cantidad de juegos que el {timeUnit} pasado</p>}
    </article>
  );
}
