import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Statistics } from '../../../models/statistics.interface';
import { DashboardConfig, StatisticsSeason } from './useDashboradConfig';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getCurrentDate } from '../../../utils/date';
import axios from 'axios';

export function useStatistics(dashboardConfig: DashboardConfig | null, season: StatisticsSeason | null) {
  const month = season?.month;
  const year = season?.year;

  const { token } = useAuth();
  const [data, setData] = useState<Statistics | null>(null);

  useEffect(() => {
    if (!token || !month || !year) return;

    const { month: currentMonth, year: currentYear } = getCurrentDate();

    // Si es la fecha actual, conectamos SSE
    if (currentMonth === month && currentYear === year) {
      const controller = new AbortController();

      fetchEventSource(import.meta.env.VITE_API_URL + '/api/statistics', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        signal: controller.signal,
        onmessage(ev) {
          if (ev.data) {
            const parsedData = JSON.parse(ev.data);
            setData(parsedData);
          }
        },
        onerror(err) {
          console.error('SSE error:', err);
          controller.abort();
        },
        onclose() {
          console.log('SSE connection closed');
        },
      });

      // Cleanup: cerramos la conexión SSE al desmontar o cambiar deps
      return () => {
        controller.abort();
      };
    }

    axios
      .get<Statistics>(`${import.meta.env.VITE_API_URL}/api/statistics/${month}/${year}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching statistics:', err);
      });
  }, [token, month, year]);

  return { data, dashboardConfig };
}
