import clsx from 'clsx';
import { Sales } from '../../../../models/statistics.interface';
import { normalizeProfitData } from '../../../../utils/statistics';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatPrice } from '../../../../utils/formatPrice';

export function ProfitWidget({
  currentSales,
  prevSales,
  timeUnit,
}: {
  currentSales: Sales;
  prevSales: Sales;
  timeUnit: 'mes' | 'año';
}) {
  const { profit, percent, isMajor } = normalizeProfitData(currentSales, prevSales);

  return (
    <article className="bg-placeholder space-y-4 rounded p-6">
      <h4>Total Ganado</h4>
      <div className="font-bebas flex gap-4 text-xl">
        <span className="text-4xl">{formatPrice(profit, false)}</span>
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
        Las Ganancias {isMajor ? 'aumentaron' : 'disminuyeron'} en un <strong>{percent}%</strong> respecto al {timeUnit}{' '}
        pasado
      </p>
    </article>
  );
}
