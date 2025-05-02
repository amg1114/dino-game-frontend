import { Outlet } from 'react-router';
import { CategoriesSection } from './components/CategoriesSection';
import { GamesSection } from './components/GamesSection';
import { useHomePage } from './hooks/useHomePage';

export function HomePage() {
  const { freeGames, paidGames, discountedGames, categories } = useHomePage();
  return (
    <div className="space-y-9">
      <GamesSection title="Destacados Gratuitos" data={freeGames} />
      <GamesSection title="Destacados de Pago" data={paidGames} />
      <GamesSection title="Descuentos" data={discountedGames} />
      <CategoriesSection data={categories} />
      <Outlet />
    </div>
  );
}
