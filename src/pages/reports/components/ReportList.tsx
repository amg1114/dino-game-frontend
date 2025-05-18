import { Pagination } from "../../../components/pagination";
import { useReportesPage } from "../hooks/useReportesPage";
import { ReportCard } from "./ReportCard";
import { ReportPlaceHolder } from "./ReportPlaceHolder";
export function ReportList() {
    const { data, loading, error, itemsPerPage, totalItems, page, setPage } = useReportesPage();

    return (
        <section>
            {error && <p className="bg-placeholder text-body rounded p-4 text-center uppercase">Ocurrio un error al mostrar los reportes</p>}
            {loading && (
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 3 }, (_, index) => (
                        <ReportPlaceHolder key={index} />
                    ))}
                </div>
            )}
            {!loading && data.length > 0 && (
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl font-bold">Reportes</h1>
                    <div className="grid grid-cols-3 gap-4 md:grid sx:gap-6">
                        {data.map((reporte) => (
                            <ReportCard key={reporte.id} report={reporte} wrapperExtraClasses='py-4' />
                        ))}
                    </div>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        page={page}
                        setPage={setPage} />
                </div>
            )}

        </section>

    )
}