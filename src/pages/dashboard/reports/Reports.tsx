import { ReportList } from './components/ReportList';
import SearchReport from './components/SearchReport';
import { ReportesProvider } from './hooks/useReportsContext';

export function Reports() {
  return (
    <div className="gap-2">
      <h1>Reportes</h1>
      <ReportesProvider>
        <SearchReport />
        <ReportList />
      </ReportesProvider>
    </div>
  );
}
