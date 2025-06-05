import { TooltipProps } from 'recharts';

export function CustomTooltip({ active, payload, label }: TooltipProps<string, string>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: '#303030',
        borderRadius: '8px',
        padding: '10px',
        color: 'white',
      }}
    >
      <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        {isNaN(Number(label)) ? `Mes: ${label}` : `Día: ${label}`}
      </p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}
