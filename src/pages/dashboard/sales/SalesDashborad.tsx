import { Share2Icon } from 'lucide-react';
import { useSalesPage } from './hooks/useSalesPage';
import { StyledSelect } from '@components/forms/StyledSelect';
import { Modal } from '@components/Modal';
import { StyledInput } from '@components/forms/StyledInput';
import { useRef } from 'react';

export function SalesDashboard() {
  const tablaRef = useRef<HTMLTableElement>(null);
  const { sales, dashboardConfig, options, showShare, setShowShare, handleConfigChange, setSendTo, handleSendTable } =
    useSalesPage(tablaRef);

  return (
    <>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1>Ventas del Sistema</h1>
        <div className="grid grid-cols-2 gap-4">
          <StyledSelect
            id="salesYear"
            label="Año"
            options={options.years}
            value={dashboardConfig.selectedYear}
            onChange={(e) => handleConfigChange('selectedYear', e.target.value)}
          />
          <StyledSelect
            id="salesMonth"
            label="Mes"
            options={options.months}
            value={dashboardConfig.selectedMonth}
            onChange={(e) => handleConfigChange('selectedMonth', e.target.value)}
          />
        </div>
        <div className="flex w-full justify-end">
          <button type="button" className="primary-button float-end" onClick={() => setShowShare(true)}>
            <Share2Icon className="inline-block" /> Compartir
          </button>
        </div>
      </header>

      {sales.length === 0 && <p>No hay ventas registradas en el sistema.</p>}

      {sales.length > 0 && (
        <div className="border-placeholder-2 bg-body overflow-auto rounded-lg border">
          <table className="min-w-full table-auto border-collapse text-left" ref={tablaRef}>
            <thead className="bg-placeholder text-sm tracking-wide text-white uppercase">
              <tr>
                <th className="border-placeholder-2 border-b px-4 py-3">Fecha</th>
                <th className="border-placeholder-2 border-b px-4 py-3">Juego</th>
                <th className="border-placeholder-2 border-b px-4 py-3">Costo</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="bg-body hover:bg-placeholder-2 transition-colors">
                  <td className="border-placeholder-2 border-b px-4 py-2">
                    {new Date(sale.fechaCompra).toLocaleDateString()}
                  </td>
                  <td className="border-placeholder-2 border-b px-4 py-2">{sale.videoGame.titulo}</td>
                  <td className="border-placeholder-2 border-b px-4 py-2">${sale.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showShare && (
        <Modal
          modalTitle="Compartir reporte de Ventas"
          size="sm"
          modalId="login-modal"
          onClose={() => setShowShare(false)}
        >
          <StyledInput
            id="shareReportEmail"
            label="Enviar a:"
            type="email"
            placeholder="Ingrese el correo electrónico"
            className="mb-4"
            value={dashboardConfig.sendTo} // Placeholder for email input value
            onChange={(e) => setSendTo(e.target.value)} // Placeholder for email input handling
          />
          <div className="flex justify-end">
            <button type="button" className="primary-button" onClick={handleSendTable}>
              Enviar Reporte
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
