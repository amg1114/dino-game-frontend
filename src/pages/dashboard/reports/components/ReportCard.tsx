import { Link } from "react-router";
import { Report } from "../../../../models/report.interface";
import { useAlert } from "../../../../hooks/useAlert";
import { useCallback } from "react";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { useReportes } from "../hooks/useReportsContext";
import { CircleX, Gamepad, MessageSquareWarning, SquareCheck } from "lucide-react";




interface ReportCardProps {
    report: Report,
    wrapperExtraClasses?: string;
}

export function ReportCard({ report, wrapperExtraClasses }: ReportCardProps) {
    const { showAlert } = useAlert();
    const { updateReport } = useUpdateReport();
    const { refetch } = useReportes();

    const handleAccept = useCallback(() => {
        showAlert({
            title: 'Reporte',
            message: '¿Estás seguro de que deseas aceptar este reporte?',
            type: 'warning',
            confirmText: 'Sí, continuar',
            cancelText: 'No, cancelar',
            isConfirm: true,
            async onClose(confirm) {
                if (confirm) {
                    try {
                        await updateReport(report.id, { state: "APPROVED" });
                        refetch();
                        showAlert({
                            title: 'Reporte',
                            message: 'El reporte ha sido aceptado correctamente.',
                            type: 'success',
                            confirmText: 'Aceptar',
                            duration: 2000,
                        });
                    } catch (e) {
                        console.error(e);
                        showAlert({
                            title: 'Error',
                            message: 'No se pudo aceptar el reporte',
                            type: 'error',
                            duration: 2000,
                        });
                    }
                }
            },
        });
    }, [showAlert, report.id, updateReport]);

    const handleReject = useCallback(() => {
        showAlert({
            title: 'Reporte',
            message: '¿Estás seguro de que deseas rechazar este reporte?',
            type: 'warning',
            confirmText: 'Sí, continuar',
            cancelText: 'No, cancelar',
            isConfirm: true,
            async onClose(confirm) {
                if (confirm) {
                    try {
                        await updateReport(report.id, { state: "REJECTED" });
                        refetch();
                        showAlert({
                            title: 'Reporte',
                            message: 'El reporte ha sido rechazado correctamente.',
                            type: 'success',
                            confirmText: 'Aceptar',
                            duration: 2000,
                        });
                    } catch (e) {
                        console.error(e);
                        showAlert({
                            title: 'Error',
                            message: 'No se pudo rechazar el reporte',
                            type: 'error',
                            duration: 2000,
                        });
                    }
                }
            },
        });
    }, [showAlert, report.id, updateReport]);



    return (
        <article className={`flex h-full flex-col bg-placeholder rounded-sm p-5 ${wrapperExtraClasses}`}>
            <section className="flex justify-between mb-2">
                <h3 className="leading-none md:text-2xl">REPORT #{report.id}</h3>
                <div className="flex gap-2">
                    <button className="cursor-pointer hover:scale-110" onClick={handleReject}>
                        <CircleX className="text-green h-5 w-5" />
                    </button>
                    <button className="cursor-pointer hover:scale-110" onClick={handleAccept}>
                        <SquareCheck className="text-red h-5 w-5" />
                    </button>

                </div>
            </section>

            <section className="flex gap-2">
                <Gamepad className="text-green h-5 w-5" />
                <Link to={`/video-games/${report.videoGame?.slug}`} className="font-bebas hover:text-green relative z-20 pt-0.5 text-xl leading-none text-white uppercase not-hover:no-underline flex items-center">{report.videoGame?.titulo}</Link>
            </section>
            <section className="flex gap-2">
                <MessageSquareWarning className="text-green h-5 w-5" />
                <span className="font-bebas text-xl ">{report.typeReport?.title}</span>
                <div className=""></div>
            </section>
        </article>
    )
}