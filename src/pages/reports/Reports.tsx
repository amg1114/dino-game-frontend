import { useReportesPage } from "./hooks/useReportesPage";

export function Reports() {
    const { data } = useReportesPage();

    if (!data) return <p>Cargando</p>;

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Reportes</h1>
        </div>
    );

}