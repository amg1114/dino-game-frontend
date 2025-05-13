import { useEffect, useState } from 'react';
import { Sale, SalesType } from '../../../models/statistics.interface';
import {
  NormalizedSalesData,
  DashboardUnit,
  normalizeMonthSalesData,
  normalizeYearSalesData,
  SeasonOption,
  getInitialSeason,
  getMonthOptions,
  getYearOptions,
} from '../../../utils/statistics';
import { getSeasonTitle } from '../../../utils/date';

export interface DashboardConfig {
  showBy: DashboardUnit;
  salesUnit: SalesType;
  chartConfig: {
    axisKey: string;
    currentKey: string;
    prevKey: string;
    currentName: string;
    prevName: string;
    normalizer: (currentSales: Sale[], prevSales: Sale[]) => NormalizedSalesData[];
  };
}

export interface StatisticsSeason {
  title: string;
  month: string;
  year: number;
  value: string;
  options: SeasonOption[];
}

export const dashboardUnitsOptions: { label: string; value: DashboardUnit }[] = [
  { label: 'Mes', value: 'mes' },
  { label: 'Año', value: 'año' },
];

export function useDashboardConfig() {
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig | null>(null);
  const [season, setSeason] = useState<StatisticsSeason | null>(null);

  const buildDashboardConfig = (unit: DashboardUnit) => {
    const isMonth = unit === 'mes';

    setDashboardConfig({
      showBy: isMonth ? 'mes' : 'año',
      salesUnit: isMonth ? 'monthSales' : 'yearSales',
      chartConfig: {
        axisKey: isMonth ? 'day' : 'month',
        currentKey: isMonth ? 'currentMonth' : 'currentYear',
        prevKey: isMonth ? 'prevMonth' : 'prevYear',
        currentName: isMonth ? 'Mes Actual' : 'Año Actual',
        prevName: isMonth ? 'Mes Anterior' : 'Año Anterior',
        normalizer: isMonth ? normalizeMonthSalesData : normalizeYearSalesData,
      },
    });
  };

  const handleDashboardUnitChange = (unit: DashboardUnit) => {
    buildDashboardConfig(unit);
    setSeason((prev) => {
      if (!prev) return getInitialSeason();
      return {
        ...prev,
        options: unit === 'mes' ? getMonthOptions(prev.year) : getYearOptions(),
        value: unit === 'mes' ? prev.month : prev.year.toString(),
      };
    });
  };

  const hanldeSeasonChange = (value: string) => {
    setSeason((prev) => {
      if (!prev || !dashboardConfig) return getInitialSeason();
      const isMonth = dashboardConfig.showBy === 'mes';
      const month = isMonth ? value : prev.month;
      const year = isMonth ? prev.year : Number(value);
      const title = getSeasonTitle(month, year, dashboardConfig.showBy);

      return {
        ...prev,
        month,
        year,
        value,
        title,
      };
    });
  };

  useEffect(() => {
    buildDashboardConfig('mes');
    setSeason(getInitialSeason());
  }, []);

  return {
    dashboardConfig,
    season,
    dashboardUnitsOptions,
    buildDashboardConfig,
    handleDashboardUnitChange,
    hanldeSeasonChange,
  };
}
