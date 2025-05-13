import { ProfitWidget } from '../components/dashboard/ProfitWidget';
import { SoldGamesWidget } from '../components/dashboard/SoldGamesWidget';
import { SoldGameWidget } from '../components/dashboard/SoldGameWidget';
// import { useProfileDashboard } from '../hooks/useProfileDashboard';
// import { SalesChart } from '../components/dashboard/SalesChart';
import { StyledSelect } from '../../../components/forms/StyledSelect';
import { useStatistics } from '../hooks/useStatistics';
import { useDashboardConfig } from '../hooks/useDashboradConfig';
import { DashboardUnit } from '../../../utils/statistics';
import { SalesChart } from '../components/dashboard/SalesChart';
import clsx from 'clsx';

export function ProfileDashboard() {
  const { dashboardConfig, season, dashboardUnitsOptions, handleDashboardUnitChange, hanldeSeasonChange } =
    useDashboardConfig();
  const { data } = useStatistics(dashboardConfig, season);

  if (!dashboardConfig || !season || !data) return <p>Cargando</p>;

  const hasSalesData =
    data[dashboardConfig.salesUnit].currentSales.sales.length > 0 ||
    data[dashboardConfig.salesUnit].prevSales.sales.length > 0;

  const hasBestSoldGame = data[dashboardConfig.salesUnit].bestWorstSellingGames.mostSoldVideoGame.sales > 0;
  const hasLeasSoldGame = data[dashboardConfig.salesUnit].bestWorstSellingGames.leastSoldVideoGame.sales > 0;
  return (
    <>
      <section className="borderb border-b-placeholder pb-12">
        <header className="flex items-start justify-between">
          <h1 className="flex-1">{season.title}</h1>
          <div className="grid grid-cols-2 gap-6 md:max-w-3xs">
            <StyledSelect
              id="statisticsType"
              label="Ver por:"
              options={dashboardUnitsOptions}
              value={dashboardConfig.showBy}
              onChange={(e) => {
                handleDashboardUnitChange(e.target.value as DashboardUnit);
              }}
            />
            <StyledSelect
              id="statisticsSeason"
              label="Periodo:"
              options={season.options}
              value={season.value}
              onChange={(e) => {
                hanldeSeasonChange(e.target.value);
              }}
            />
          </div>
        </header>
        <SalesChart
          prevLabel="Mes Anterior"
          currentLabel="Mes Actual"
          data={data}
          salesUnit={dashboardConfig.salesUnit}
          normalizer={dashboardConfig.chartConfig.normalizer}
        />

        {hasSalesData && (
          <div
            className={clsx('mt-12 grid grid-cols-1 gap-6 md:grid-cols-2', {
              'lg:grid-cols-4': hasBestSoldGame || hasLeasSoldGame,
            })}
          >
            <SoldGamesWidget data={data[dashboardConfig.salesUnit]} timeUnit={dashboardConfig.showBy} />
            <ProfitWidget data={data[dashboardConfig.salesUnit]} timeUnit={dashboardConfig.showBy} />
            {hasBestSoldGame && (
              <SoldGameWidget
                game={data[dashboardConfig.salesUnit].bestWorstSellingGames.mostSoldVideoGame}
                unit={dashboardConfig.showBy}
                type="best"
              />
            )}
            {hasLeasSoldGame && (
              <SoldGameWidget
                game={data[dashboardConfig.salesUnit].bestWorstSellingGames.leastSoldVideoGame}
                unit={dashboardConfig.showBy}
                type="worst"
              />
            )}
          </div>
        )}
        {!hasSalesData && (
          <p className="bg-placeholder text-body mt-12 rounded p-4 text-center uppercase">
            No hay ventas disponibles en el periodo seleccionado
          </p>
        )}
      </section>
    </>
  );
}
