import { ChevronRight } from 'lucide-react';
import { useDescuento } from '../hooks/useDescuento';
import { DescuentoCard } from './DescuentoCard';
import { DescuentoColumnHeaders } from './DescuentoColumnHeaders';
import { Link, Outlet } from 'react-router';

export function DescuentoList({ id }: { id: string }) {
  const { data, loading, error, ObtenerDescuentos } = useDescuento(id);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center gap-1 uppercase">
        <h3>{data[0]?.videoGame?.titulo}</h3>
        <ChevronRight className="text-green mb-1 h-6 w-6" />
        <h3>Descuentos</h3>
      </div>
      <div>
        {!loading && !error && data.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-max md:min-w-full">
              <DescuentoColumnHeaders />
              {data.map((descuento) => (
                <DescuentoCard key={descuento.id} descuento={descuento} obtenerDescuentos={ObtenerDescuentos} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <p className="bg-placeholder text-body rounded p-4 text-center uppercase">
                No existen descuentos para este videojuego
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end pt-3 pr-1">
        <Link
          to={`/dashboard/juegos/${id}/descuentos/nuevo`}
          className="primary-button primary-button--xs mt-auto w-fit"
        >
          Agregar
        </Link>
      </div>
      <Outlet context={{ ObtenerDescuentos }} />
    </div>
  );
}
