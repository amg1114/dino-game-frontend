import { ServerCrash } from 'lucide-react';

export function Unauthorized() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <figure className="text-green text-4xl md:text-9xl">
        <ServerCrash />
      </figure>
      <h1 className="text-3xl font-bold text-red-600 md:text-6xl">
        Acceso no <span className="text-green">autorizado</span>
      </h1>
      <p className="text-lg md:text-2xl">No tienes permiso para acceder a esta página.</p>
    </section>
  );
}
