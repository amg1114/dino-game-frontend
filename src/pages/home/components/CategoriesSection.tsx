import { Categoria } from '../../../models/categoria.interface';
import { SectionData } from '../hooks/useHomePage';
import { Link } from 'react-router';

interface CategoriesSectionProps {
  data: SectionData<Categoria>;
}

export function CategoriesSection({ data }: CategoriesSectionProps) {
  const { loading, error, data: categories } = data;
  return (
    <section className="border-t-placeholder space-y-9 border-t pt-9">
      <h2>
        <span className="text-green">Dino</span>Categorias
      </h2>
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ul className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <li className="list-none" key={category.id}>
              <Link
                className="primary-button font-bebas! block! w-full! text-center text-xl font-normal!"
                to={`/categorias/${category.slug}`}
              >
                {category.titulo}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
