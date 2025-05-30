import { Version } from '@models/video-game.interface';
import { Calendar } from 'lucide-react';

export function VersionRow({ version }: { version: Version }) {
  return (
    <div className="border-b-placeholder flex flex-wrap items-start gap-4 py-4 not-last:border-b">
      <span className="bg-green font-bebas rounded px-4 py-1">v{version.version}</span>
      <p className="flex-1">
        {version.descripcion}
        <br />
        Requisitos: {version.requisitos?.map((req) => req.requisito).join(', ') || 'No especificados'}
      </p>
      <time dateTime={version.createdAt} className="ml-auto flex items-center gap-2">
        <Calendar />{' '}
        {new Date(version.createdAt).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <p className="w-full"></p>
    </div>
  );
}
