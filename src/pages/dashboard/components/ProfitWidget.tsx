import clsx from 'clsx';
import { UnitSales } from '../../../models/statistics.interface';
import { DashboardUnit, normalizeProfitData } from '../../../utils/statistics';
import { Equal, TrendingDown, TrendingUp } from 'lucide-react';
import { formatPrice } from '../../../utils/formatPrice';

export function ProfitWidget({ data, timeUnit }: { data: UnitSales; timeUnit: DashboardUnit }) {
  const { profit, percent, delta } = normalizeProfitData(data);

  return (
    <article className="bg-placeholder space-y-4 rounded p-6">
      <h4>Total Ganado</h4>
      <div className="font-bebas flex gap-4 text-xl">
        <span className="text-4xl">{formatPrice(profit, false)}</span>
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
          Las Ganancias {delta === 'increase' ? 'aumentaron' : 'disminuyeron'} en un <strong>{percent}%</strong>{' '}
          respecto al {timeUnit} pasado
        </p>
      )}
      {delta === 'same' && <p>Las ganancias fueron las mismas que el {timeUnit} pasado</p>}
    </article>
  );
}
