import axios from 'axios';
import { Report } from '../../../../models/report.interface';

export function useUpdateReport() {
  const updateReport = async (id: number, data: Partial<Report>) => {
    return axios.patch(`${import.meta.env.VITE_API_URL}/api/reports/${id}`, data);
  };
  return { updateReport };
}
