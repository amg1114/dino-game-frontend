import { Link } from "react-router";
import { Report } from "../../../../models/report.interface";
import { useAlert } from "../../../../hooks/useAlert";
import { useCallback } from "react";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { useReportes } from "../hooks/useReportsContext";
import { CircleX, SquareCheck } from "lucide-react";




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
                        <CircleX className="text-green" />
                    </button>
                    <button className="cursor-pointer hover:scale-110" onClick={handleAccept}>
                        <SquareCheck className="text-red " />
                    </button>

                </div>
            </section>

            <section className="flex gap-2">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 9H7.5M6 7.5V10.5M11.25 9.75H11.2575M13.5 8.25H13.5075M3 4.5H15C15.8284 4.5 16.5 5.17157 16.5 6V12C16.5 12.8284 15.8284 13.5 15 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V6C1.5 5.17157 2.17157 4.5 3 4.5Z" stroke="#3DAB7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <Link to={`/video-games/${report.videoGame?.slug}`} className="font-bebas hover:text-green relative z-20 pt-0.5 text-xl leading-none text-white uppercase not-hover:no-underline flex items-center">{report.videoGame?.titulo}</Link>
            </section>
            <section className="flex gap-2">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5.25V6.75M9 9.75H9.0075M15.75 11.25C15.75 11.6478 15.592 12.0294 15.3107 12.3107C15.0294 12.592 14.6478 12.75 14.25 12.75H5.25L2.25 15.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V11.25Z" stroke="#3DAB7B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className="font-bebas text-xl ">{report.typeReport?.title}</span>
                <div className=""></div>
            </section>
        </article>
    )
}