export function getSeasonTitle(month: string, year: number, unit: 'mes' | 'año') {
  let title = 'Estadisticas de Ventas para';
  if (unit === 'año') {
    title += ` ${year}`;
  } else {
    const monthLabel = getMonthLabel(month, year);
    title += ` ${monthLabel} ${year}`;
  }

  return title;
}

export function getMonthLabel(month: string, year: number) {
  const date = new Date(year, parseInt(month) - 1);
  const monthLabel = date.toLocaleString('es-ES', { month: 'long' });
  return monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
}
