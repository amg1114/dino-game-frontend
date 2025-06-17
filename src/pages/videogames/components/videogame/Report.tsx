import { StyledSelect } from "@components/forms/StyledSelect";
import { Modal } from "@components/Modal";
import { useReport } from "@pages/videogames/hooks/videogame/useReport";
import { useParams } from "react-router";

export function Report() {
    const { slug } = useParams();
    const {
        handleClose,
        typeReportsData,
        handleReportSubmit,
        handleReportTypeChange,
        reportTypeSelected,
        gameId
    } = useReport(slug || '');
    return (
        <Modal onClose={handleClose} modalTitle="Reportar un problema" size="md" modalId="report-modal">
            <div className="">
                <div className="flex w-full flex-col">
                    <StyledSelect
                        id="report-type-select"
                        label="Reportar por"
                        options={typeReportsData?.data.map((typeReport) => ({
                            value: typeReport.id,
                            label: typeReport.title
                        }))}
                        value={reportTypeSelected ? reportTypeSelected.id : ''}
                        onChange={handleReportTypeChange}
                    />
                </div>
                {reportTypeSelected ? (
                    <div className="mt-4">
                        <p>{reportTypeSelected.description}</p>
                        <button
                            className="mt-4 w-full rounded bg-green px-4 py-2 text-white hover:bg-green/80"
                            onClick={() => handleReportSubmit(reportTypeSelected.id, gameId)}
                        >
                            Enviar Reporte
                        </button>
                        <p className="text-sm text-white">
                            Al enviar este reporte, se notificará al equipo de soporte sobre el problema seleccionado.
                            Gracias por tu colaboración.
                        </p>
                    </div>
                ) : <></>}
            </div>
        </Modal>
    );
}