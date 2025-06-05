import { Outlet } from 'react-router';
import { CategoriesSection } from './components/CategoriesSection';
import { GamesSection } from './components/GamesSection';
import { useHomePage } from './hooks/useHomePage';
import { PostsSection } from './components/PostsSection';
import { GamesSlider } from './components/GamesSlider';
import { usePageMetadata } from '../../hooks/usePageMetadata';
export function HomePage() {
  const { blogPosts, freeGames, paidGames, discountedGames, categories, featuredGames } = useHomePage();

  usePageMetadata({
    title: 'Home',
    description: 'Tu tienda de juegos favorita, donde la diversión nunca se extingue.',
  });

  return (
    <div className="space-y-9">
      <GamesSlider data={featuredGames} />
      <PostsSection data={blogPosts} />
      <GamesSection title="Destacados Gratuitos" data={freeGames} />
      <GamesSection title="Destacados de Pago" data={paidGames} />
      <GamesSection title="Descuentos" data={discountedGames} />
      <CategoriesSection data={categories} />
      <Outlet />
    </div>
  );
}
