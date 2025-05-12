import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Legend, CartesianAxis, Area } from 'recharts';
import { NormalizedMonthSalesData, NormalizedYearSalesData } from '../../../../utils/statistics';

interface ChartProps {
  data: NormalizedYearSalesData[] | NormalizedMonthSalesData[];
  axisKey: string;
  prevKey: string;
  currentKey: string;
  currentName: string;
  prevName: string;
}
export function SalesChart({ data, axisKey, prevKey, currentKey, prevName, currentName }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey={axisKey} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: '#303030',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
          }}
          formatter={(value: number) => {
            return [`${value}`, 'Ventas'];
          }}
        />
        <Legend />
        <CartesianAxis axisLine={false} tickLine={false} />
        <Area type="monotone" dataKey={prevKey} stroke="#faeab3" fill="#faeab3" name={prevName} />
        <Area type="monotone" dataKey={currentKey} stroke="#3dab7b" fill="#3dab7b" name={currentName} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
