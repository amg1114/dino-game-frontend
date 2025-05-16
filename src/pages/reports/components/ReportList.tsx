import { useReportesPage } from "../hooks/useReportesPage";
import { ReportCard } from "./ReportCard";
export function ReportList() {
    const { data } = useReportesPage();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Reportes</h1>
            <div className="grid grid-cols-3 gap-4 md:grid sx:gap-6">
                {data.map((reporte) => (
                    <ReportCard key={reporte.id} report={reporte} wrapperExtraClasses='py-4' />
                ))}
            </div>
        </div>
    )
}