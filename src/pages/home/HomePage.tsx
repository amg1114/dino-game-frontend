import { HomeSection } from './components/HomeSection';
import { useHomePage } from './hooks/useHomePage';

export function HomePage() {
  const { freeGames } = useHomePage();
  return (
    <>
      <HomeSection title="Destacados Gratuitos" data={freeGames} />
    </>
  );
}
