import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Legend, CartesianAxis, Area } from 'recharts';
import { NormalizedSalesData } from '../../../utils/statistics';
import { Sale, SalesType, Statistics } from '../../../models/statistics.interface';
import { CustomTooltip } from './CustomChartTooltip';

interface ChartProps {
  currentLabel: string;
  prevLabel: string;
  data: Statistics;
  salesUnit: SalesType;
  normalizer: (currentSales: Sale[], prevSales: Sale[]) => NormalizedSalesData[];
}
export function SalesChart({ prevLabel, currentLabel, data, salesUnit, normalizer }: ChartProps) {
  const normalizedData = normalizer(data[salesUnit].currentSales.sales, data[salesUnit].prevSales.sales);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={normalizedData}>
        <XAxis dataKey="unit" label={{ value: 'Días', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Nro de Ventas', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          content={<CustomTooltip />}
          formatter={(value: number) => {
            return [`${value}`, 'Ventas'];
          }}
        />
        <Legend />
        <CartesianAxis axisLine={false} tickLine={false} />
        <Area type="monotone" dataKey="prev" stroke="#faeab3" fill="#faeab3" fillOpacity={1} name={prevLabel} />
        <Area type="monotone" dataKey="current" stroke="#3dab7b" fill="#3dab7b" fillOpacity={1} name={currentLabel} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
