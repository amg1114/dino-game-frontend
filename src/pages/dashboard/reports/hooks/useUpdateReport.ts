import axios from "axios";
import { Report } from "../../../../models/report.interface";



export function useUpdateReport() {

    const updateReport = async (id: number, data: Partial<Report>) => {
        return axios.patch(`/api/reports/${id}`, data);
    };
    return { updateReport };
}