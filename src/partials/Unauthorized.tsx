import { ServerCrash } from 'lucide-react';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';

export function Unauthorized() {
  return (
    <div className="bg-body py-9">
      <div className="container flex min-h-screen flex-col gap-8 md:gap-10">
        <Header />
        <main className="flex flex-1 flex-wrap items-center gap-4 md:justify-center">
          <figure className="text-green text-4xl md:text-9xl">
            <ServerCrash />
          </figure>
          <article>
            <h1 className="text-3xl font-bold text-red-600 md:text-6xl">
              Acceso no <span className="text-green">autorizado</span>
            </h1>
            <p className="text-lg md:text-2xl">No tienes permiso para acceder a esta página.</p>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
