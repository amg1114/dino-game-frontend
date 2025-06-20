import { Outlet } from 'react-router';
import { Header } from '../partials/header/Header';
import { Footer } from '../partials/footer/Footer';

export const GlobalLayout = () => {
  return (
    <div className="bg-body py-9">
      <div className="container flex min-h-screen flex-col gap-8 md:gap-10">
        <Header />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
