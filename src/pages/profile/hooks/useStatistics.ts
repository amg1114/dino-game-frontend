import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Statistics } from '../../../models/statistics.interface';
import { DashboardConfig, StatisticsSeason } from './useDashboradConfig';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export function useStatistics(dashboardConfig: DashboardConfig | null, season: StatisticsSeason | null) {
  const month = season?.month;
  const year = season?.year;

  const { token } = useAuth();
  const [data, setData] = useState<Statistics | null>(null);

  useEffect(() => {
    if (!token || !month || !year) return;

    const controller = new AbortController();
    const endpoint = `/api/statistics/${month}/${year}`;
    console.log('Fetching data from:', endpoint);
    fetchEventSource(endpoint, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      signal: controller.signal,
      onmessage(ev) {
        if (ev.data) {
          const data = JSON.parse(ev.data);
          console.log('Data:', data.season);
          setData(data);
          return;
        }
      },
      onerror(err) {
        console.error('Error:', err);
        controller.abort();
      },
      onclose() {
        console.log('Connection closed');
      },
    });

    return () => controller.abort();
  }, [token, month, year]);

  return { data, dashboardConfig };
}
