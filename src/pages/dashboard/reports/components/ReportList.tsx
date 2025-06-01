import { Pagination } from "../../../../components/pagination";
import { useReportes } from "../hooks/useReportsContext";
import { ReportCard } from "./ReportCard";
import { ReportPlaceHolder } from "./ReportPlaceHolder";
export function ReportList() {
    const { data, loading, error, itemsPerPage, totalItems, page, setPage } = useReportes();
    return (
        <section className="mt-5">
            {error && <p className="bg-placeholder text-body rounded p-4 text-center uppercase">Ocurrio un error al mostrar los reportes</p>}
            {loading && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-none">
                    {Array.from({ length: 3 }, (_, index) => (
                        <ReportPlaceHolder key={index} />
                    ))}
                </div>
            )}

            {!loading && data.length > 0 && (
                <div className="flex flex-col gap-6">
                    {
                        data.filter(reporte => reporte.state === 'PENDING').length <= 0 ? (
                            <div className="flex flex-col gap-4">
                                <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay reportes pendientes</p>
                            </div>
                        ) : (<>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 ">
                                    {data
                                        .filter(reporte => reporte.state === 'PENDING')
                                        .map((reporte) => (
                                            <ReportCard key={reporte.id} report={reporte} wrapperExtraClasses='py-4' />
                                        ))}
                                </div>
                            </div>
                        </>)
                    }
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        page={page}
                        setPage={setPage} />
                </div >
            )}

        </section >

    )
}