import { CalendarCheck, CalendarX, Trash2 } from 'lucide-react';
import { Descuento } from '../../../models/descuento.interface';
import { formatPrice } from '../../../utils/formatPrice';
import { useDeleteDescuento } from '../hooks/useDeleteDescuento';

interface DescuentoCardProps {
  descuento: Descuento;
  wapperExtraClasses?: string;
  obtenerDescuentos: () => void;
}

export function DescuentoCard({ descuento, obtenerDescuentos }: DescuentoCardProps) {
  const handleDelete = useDeleteDescuento(descuento.videoGame.slug, descuento.id);
  return (
    <div className="border-placeholder-2 grid grid-cols-6 items-center gap-5 border-t p-4 px-0">
      <div className="flex items-center gap-2 text-base md:text-xs lg:text-base">
        <CalendarCheck className="text-green" />
        <span>{descuento.fechaInicio ? new Date(descuento.fechaInicio).toLocaleDateString() : ''}</span>
      </div>
      <div className="flex items-center gap-2 text-base md:text-xs lg:text-base">
        <CalendarX className="text-yellow" />
        <span>{descuento.fechaFin ? new Date(descuento.fechaFin).toLocaleDateString() : ''}</span>
      </div>
      <div className="flex items-center justify-center text-base md:text-xs lg:text-base">
        <span className="bg-placeholder-2 flex w-full items-center justify-center rounded-sm p-0.5 text-center">
          {descuento.porcentaje * 100} <span className="text-green">%</span>
        </span>
      </div>
      <div className="flex items-center justify-center text-base md:text-xs lg:text-base">
        <span className="bg-placeholder-2 flex w-full items-center justify-center rounded-sm p-0.5 text-center">
          <span className="text-yellow">{formatPrice(descuento.videoGame.precio)}</span>
        </span>
      </div>
      <div className="flex items-center justify-center text-base md:text-xs lg:text-base">
        <span className="bg-placeholder-2 flex w-full items-center justify-center rounded-sm p-0.5 text-center">
          <span className="text-green">{formatPrice(descuento.videoGame.precio * (1 - descuento.porcentaje))}</span>
        </span>
      </div>
      <div className="flex items-center justify-end pr-1 text-base md:text-xs lg:text-base">
        <button onClick={() => handleDelete(obtenerDescuentos)} className="hover:scale-110">
          <Trash2 className="bg-red h-7 w-10 rounded-sm p-1" />
        </button>
      </div>
    </div>
  );
}
