import { Sale, Sales } from '../models/statistics.interface';

const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export interface NormalizedYearSalesData {
  month: string;
  currentYear: number;
  prevYear: number;
}
export function normalizeYearSalesData(currentSales: Sale[], prevSales: Sale[]): NormalizedYearSalesData[] {
  const monthsData = [];

  for (let i = 0; i < 12; i++) {
    const currentMonthData = currentSales.find((sale) => Number(sale.unit) === i + 1);
    const prevMonthData = prevSales.find((sale) => Number(sale.unit) === i + 1);

    monthsData.push({
      month: monthLabels[i],
      currentYear: currentMonthData ? currentMonthData.amount : 0,
      prevYear: prevMonthData ? prevMonthData.amount : 0,
    });
  }

  return monthsData;
}

export interface NormalizedMonthSalesData {
  day: string;
  currentMonth: number;
  prevMonth: number;
}
export function normalizeMonthSalesData(currentSales: Sale[], prevSales: Sale[]): NormalizedMonthSalesData[] {
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
      day: i.toString(),
      currentMonth: currentDayData ? currentDayData.amount : 0,
      prevMonth: prevDayData ? prevDayData.amount : 0,
    });
  }

  return daysData;
}

export function normalizeSoldGamesData(curentSales: Sales, prevSales: Sales) {
  const soldGames = curentSales.count;
  const difference = soldGames - prevSales.count;
  const percent = Math.ceil((difference / prevSales.count) * 100);
  const isMajor = percent > 0;

  return {
    soldGames,
    difference: Math.abs(difference),
    percent,
    isMajor,
  };
}

export function normalizeProfitData(currentSales: Sales, prevSales: Sales) {
  const profit = currentSales.profit;
  const difference = profit - prevSales.profit;
  const percent = Math.ceil((difference / prevSales.profit) * 100);
  const isMajor = percent > 0;

  return {
    profit,
    difference: Math.abs(difference),
    percent,
    isMajor,
  };
}
