import { normalizeMonthSalesData, normalizeYearSalesData } from '../../../utils/statistics';
import { ProfitWidget } from '../components/dashboard/ProfitWidget';
import { SoldGamesWidget } from '../components/dashboard/SoldGamesWidget';
import { SoldGameWidget } from '../components/dashboard/SoldGameWidget';
import { useProfileDashboard } from '../hooks/useProfileDashboard';
import { SalesChart } from '../components/dashboard/SalesChart';

export function ProfileDashboard() {
  const { usuario, data, statisticsDate } = useProfileDashboard();
  if (!data) {
    return <p>Cargando...</p>;
  }
  const yearSales = normalizeYearSalesData(data?.yearSales.currentYearSales.sales, data?.yearSales.prevYearSales.sales);
  const monthSales = normalizeMonthSalesData(
    data?.monthSales.currentMonthSales.sales,
    data?.monthSales.prevMonthSales.sales
  );
  return (
    <>
      {usuario && data && (
        <>
          <section className="borderb border-b-placeholder pb-12">
            <h1 className="text-center">Estadísticas de {statisticsDate.monthName}</h1>
            <SalesChart
              data={monthSales}
              axisKey="day"
              prevKey="prevMonth"
              currentKey="currentMonth"
              prevName="Mes Anterior"
              currentName="Mes Actual"
            />

            <div className="mt-12 grid grid-cols-4 gap-6">
              <SoldGamesWidget
                currentSales={data.monthSales.currentMonthSales}
                prevSales={data.monthSales.prevMonthSales}
                timeUnit="mes"
              />
              <ProfitWidget
                currentSales={data.monthSales.currentMonthSales}
                prevSales={data.monthSales.prevMonthSales}
                timeUnit="mes"
              />
              <SoldGameWidget game={data.monthSales.bestWorstSellingGames.mostSoldVideoGame} type="best" unit="mes" />
              <SoldGameWidget game={data.monthSales.bestWorstSellingGames.leastSoldVideoGame} type="worst" unit="mes" />
            </div>
          </section>

          <section className="borderb border-b-placeholder pb-12">
            <h1 className="text-center">Estadísticas del Año {statisticsDate.year}</h1>
            <SalesChart
              data={yearSales}
              axisKey="month"
              prevKey="prevYear"
              currentKey="currentYear"
              prevName="Año Anterior"
              currentName="Año Actual"
            />

            <div className="mt-12 grid grid-cols-4 gap-6">
              <SoldGamesWidget
                currentSales={data.yearSales.currentYearSales}
                prevSales={data.yearSales.prevYearSales}
                timeUnit="año"
              />
              <ProfitWidget
                currentSales={data.yearSales.currentYearSales}
                prevSales={data.yearSales.prevYearSales}
                timeUnit="año"
              />
              <SoldGameWidget game={data.yearSales.bestWorstSellingGames.mostSoldVideoGame} type="best" unit="año" />
              <SoldGameWidget game={data.yearSales.bestWorstSellingGames.leastSoldVideoGame} type="worst" unit="año" />
            </div>
          </section>
        </>
      )}
    </>
  );
}
