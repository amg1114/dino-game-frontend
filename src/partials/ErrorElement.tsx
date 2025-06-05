import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { ServerCrash } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();

  let title = 'Unexpected Error';
  let message = 'Something went wrong. Please try again later.';
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    switch (error.status) {
      case 401:
        title = 'Unauthorized';
        message = error.data?.sorry || 'You are not authorized to view this page.';
        break;
      case 404:
        title = 'Not Found';
        message = error.data?.message || 'The page you are looking for does not exist.';
        break;
      default:
        title = `Error ${error.status}`;
        message = error.data?.message || 'An unexpected error occurred.';
        break;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

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
              <span className="text-green">{statusCode}</span> {title}
            </h1>
            <p className="text-lg md:text-2xl">{message}</p>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
