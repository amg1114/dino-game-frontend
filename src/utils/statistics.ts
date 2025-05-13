import { Sale, SalesDelta, UnitSales } from '../models/statistics.interface';
import { StatisticsSeason } from '../pages/profile/hooks/useDashboradConfig';
import { getSeasonTitle } from './date';

const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export type DashboardUnit = 'mes' | 'año';

export interface SeasonOption {
  value: string;
  label: string;
}

export interface NormalizedSalesData {
  unit: string;
  current: number;
  prev: number;
}

export interface NormalizedWidgetData {
  difference: number;
  percent: number;
  delta: SalesDelta;
}

export interface NormalizedSoldGamesData extends NormalizedWidgetData {
  soldGames: number;
}
export interface NormalizedProfitData extends NormalizedWidgetData {
  profit: number;
}

export function normalizeYearSalesData(currentSales: Sale[], prevSales: Sale[]): NormalizedSalesData[] {
  const monthsData = [];

  for (let i = 0; i < 12; i++) {
    const currentMonthData = currentSales.find((sale) => Number(sale.unit) === i + 1);
    const prevMonthData = prevSales.find((sale) => Number(sale.unit) === i + 1);

    monthsData.push({
      unit: monthLabels[i],
      current: currentMonthData ? currentMonthData.amount : 0,
      prev: prevMonthData ? prevMonthData.amount : 0,
    });
  }

  return monthsData;
}

export function normalizeMonthSalesData(currentSales: Sale[], prevSales: Sale[]): NormalizedSalesData[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // mes actual en base 0

  // Obtener la cantidad de días del mes actual
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysData = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDayData = currentSales.find((sale) => Number(sale.unit) === i);
    const prevDayData = prevSales.find((sale) => Number(sale.unit) === i);

    daysData.push({
      unit: i.toString(),
      current: currentDayData ? currentDayData.amount : 0,
      prev: prevDayData ? prevDayData.amount : 0,
    });
  }

  return daysData;
}

export function normalizeSoldGamesData(data: UnitSales): NormalizedSoldGamesData {
  const { currentSales, prevSales } = data;

  const soldGames = currentSales.count;
  const difference = soldGames - prevSales.count;
  const percent = Math.ceil((difference / prevSales.count) * 100);
  const delta = percent > 0 ? 'increase' : percent < 0 ? 'decrease' : 'same';

  return {
    soldGames,
    difference: Math.abs(difference),
    percent,
    delta,
  };
}

export function normalizeProfitData(data: UnitSales): NormalizedProfitData {
  const { currentSales, prevSales } = data;

  const profit = currentSales.profit;
  const difference = profit - prevSales.profit;
  const percent = Math.ceil((difference / prevSales.profit) * 100);
  const delta = percent > 0 ? 'increase' : percent < 0 ? 'decrease' : 'same';

  return {
    profit,
    difference: Math.abs(difference),
    percent,
    delta,
  };
}

export const getInitialSeason = (): StatisticsSeason => {
  const now = new Date();
  const currentMonth = now.toLocaleString('default', { month: '2-digit' });
  const currentYear = now.getFullYear();

  return {
    title: getSeasonTitle(currentMonth, currentYear, 'mes'),
    month: currentMonth,
    year: currentYear,
    value: currentMonth,
    options: getMonthOptions(currentYear),
  };
};

export const getMonthOptions = (year: number): SeasonOption[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i);
    const label = date.toLocaleString('es-CO', { month: 'long' });
    return {
      value: date.toLocaleString('default', { month: '2-digit' }),
      label: label.charAt(0).toUpperCase() + label.slice(1),
    };
  });
};

export const getYearOptions = (startYear = 2023): SeasonOption[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  });
};
