import { useAlert } from '@hooks/useAlert';
import { SalesData } from '@models/statistics.interface';
import { getMonthOptions, getYearOptions, SeasonOption } from '@utils/statistics';
import { useEffect, useState, RefObject } from 'react';
import axios from 'axios';
import { z } from 'zod';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SalesDashboardConfig {
  selectedMonth: SeasonOption['value'];
  selectedYear: SeasonOption['value'];
  sendTo: string;
}

type SalesDashboardConfigField = keyof SalesDashboardConfig;

const emailSchema = z.string().email({
  message: 'El correo electrónico debe ser válido.',
});

export function useSalesPage(tablaRef: RefObject<HTMLElement | null>) {
  const { showAlert, showToast } = useAlert();
  const [showShare, setShowShare] = useState(false);
  const [sales, setSales] = useState<SalesData[]>([]);
  const [options, setOptions] = useState<{ months: SeasonOption[]; years: SeasonOption[] }>({
    months: getMonthOptions(new Date().getFullYear()),
    years: getYearOptions(),
  });
  const [dashboardConfig, setDashboardConfig] = useState<SalesDashboardConfig>({
    selectedMonth: options.months[options.months.length - 1].value,
    selectedYear: options.years[options.years.length - 1].value,
    sendTo: '',
  });

  const handleConfigChange = (field: SalesDashboardConfigField, option: SeasonOption['value']) => {
    if (field === 'selectedYear') {
      setOptions((prev) => ({
        ...prev,
        months: getMonthOptions(Number(option)),
      }));
    }

    setDashboardConfig((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  const setSendTo = (email: string) => {
    setDashboardConfig((prev) => ({
      ...prev,
      sendTo: email,
    }));
  };

  const handleSendTable = async () => {
    const validation = emailSchema.safeParse(dashboardConfig.sendTo);
    if (!validation.success) {
      showToast({
        type: 'error',
        message: 'Por favor, ingrese un correo electrónico válido.',
      });
    }

    const input = tablaRef.current;
    if (!input) return;

    const loading = showAlert({
      type: 'loading',
      title: 'Enviando tabla de ventas',
      message: 'Por favor, espere mientras se envía la tabla de ventas.',
    });

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png', 0.6);

    if (!imgData) {
      showToast({
        type: 'error',
        message: 'Error al generar la imagen de la tabla. Por favor, inténtelo de nuevo más tarde.',
      });
      loading.close();
      return;
    }

    const pdf = new jsPDF({ compress: true });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);

    const blob = pdf.output('blob');

    // Envíalo al backend
    const formData = new FormData();
    formData.append('file', blob, 'tabla.pdf');
    formData.append('email', dashboardConfig.sendTo);

    const res = await axios.post(import.meta.env.VITE_API_URL + '/api/statistics/share', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    loading.close();

    if (res.status === 201 || res.status === 200) {
      showToast({
        type: 'success',
        message: 'Tabla de ventas enviada correctamente.',
      });
      setShowShare(false);
      return;
    }

    console.error('Error sending sales table:', res);
    showToast({
      type: 'error',
      message: 'Error al enviar la tabla de ventas. Por favor, inténtelo de nuevo más tarde.',
    });
  };

  useEffect(() => {
    async function fetchSales() {
      const loading = showAlert({
        type: 'loading',
        title: 'Cargando ventas',
        message: 'Por favor, espere mientras se cargan los datos de ventas.',
      });
      try {
        const response = await axios.get<SalesData[]>(
          `${import.meta.env.VITE_API_URL}/api/statistics/sales?year=${dashboardConfig.selectedYear}&month=${dashboardConfig.selectedMonth}`
        );

        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        loading.close();
      }
    }
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardConfig.selectedMonth, dashboardConfig.selectedYear]);

  return {
    sales,
    options,
    dashboardConfig,
    showShare,
    setShowShare,
    handleConfigChange,
    handleSendTable,
    setSendTo,
  };
}
