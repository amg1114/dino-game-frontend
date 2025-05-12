import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Statistics } from '../../../models/statistics.interface';
import { Usuario } from '../../../models/user.interface';

interface StatisticsDate {
  month: string;
  monthName: string;
  year: number;
}
export function useProfileDashboard(): {
  usuario: Usuario | null;
  data: Statistics | null;
  statisticsDate: StatisticsDate;
} {
  const { usuario, token } = useAuth();
  const [statisticsDate] = useState<StatisticsDate>({
    month: new Date().toLocaleString('default', { month: '2-digit' }),
    monthName: new Date().toLocaleString('es-co', { month: 'long' }),
    year: new Date().getFullYear(),
  });
  const [data, setData] = useState<Statistics | null>(null);

  useEffect(() => {
    if (!usuario) return;

    const { month, year } = statisticsDate;
    const controller = new AbortController();

    fetchEventSource(`/api/statistics/${month}/${year}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      signal: controller.signal,
      onmessage(ev) {
        if (ev.data) {
          const data = JSON.parse(ev.data);
          setData(data);

          return;
        }
      },
      onerror(err) {
        console.error('Error:', err);
        controller.abort();
      },
    });

    return () => controller.abort();
  }, [usuario, statisticsDate, token]);

  return { usuario, data, statisticsDate };
}
