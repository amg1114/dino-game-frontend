import { Calendar } from 'lucide-react';
import { SolicitudDesarrollador } from '../../../../models/solicitud.interface';
import { truncateDescription } from '../../../../utils/truncateDescription';
import { Link } from 'react-router';

export function DevRequestCard({ request }: { request: SolicitudDesarrollador }) {
  const date = new Date(request.createdAt);
  const opcionesMes = { month: 'long' } as const;
  const mes = date.toLocaleDateString('es-ES', opcionesMes);

  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

  const fechaFormateada = `${mesCapitalizado} ${date.getDate()} de ${date.getFullYear()}`;
  return (
    <div className="bg-placeholder w-full rounded-xl px-6 py-4">
      <Link className="text-white no-underline" to={`/dashboard/solicitudes/${request.user?.id}`}>
        <div>
          <div className="flex">
            <Calendar className="text-green mt-1 text-sm" />
            <p className="mt-0.5 ml-0.5 text-sm">{fechaFormateada}</p>
          </div>
          <h4 className="my-2">{request.user?.nombre}</h4>
          <p className="line-clamp-3">{truncateDescription(request.mensaje)}</p>
        </div>
      </Link>
    </div>
  );
}
