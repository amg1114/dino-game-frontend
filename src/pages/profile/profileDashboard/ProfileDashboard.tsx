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

export function ProfileDashboard() {
  const { dashboardConfig, season, dashboardUnitsOptions, handleDashboardUnitChange, hanldeSeasonChange } =
    useDashboardConfig();
  const { data } = useStatistics(dashboardConfig, season);

  if (!dashboardConfig || !season || !data) return <p>Cargando</p>;

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
        <p>
          Show data by {dashboardConfig.showBy}, at month {season.month} {season.year}{' '}
        </p>

        <SalesChart
          prevLabel="Mes Anterior"
          currentLabel="Mes Actual"
          data={data}
          salesUnit={dashboardConfig.salesUnit}
          normalizer={dashboardConfig.chartConfig.normalizer}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SoldGamesWidget data={data[dashboardConfig.salesUnit]} timeUnit={dashboardConfig.showBy} />
          <ProfitWidget data={data[dashboardConfig.salesUnit]} timeUnit={dashboardConfig.showBy} />
          <SoldGameWidget
            game={data[dashboardConfig.salesUnit].bestWorstSellingGames.mostSoldVideoGame}
            unit={dashboardConfig.showBy}
            type="best"
          />
          <SoldGameWidget
            game={data[dashboardConfig.salesUnit].bestWorstSellingGames.leastSoldVideoGame}
            unit={dashboardConfig.showBy}
            type="worst"
          />
        </div>
      </section>
    </>
  );
}
