import { GameCardBasic } from '@components/video-games/GameCardBasic';
import { PaginatedResponse } from '@models/base-fetch.interface';
import { Categoria } from '@models/categoria.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function CategoryIndex() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  useEffect(() => {
    axios
      .get<PaginatedResponse<Categoria>>('/api/categorias?withGames=true')
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <section className="space-y-6">
      <h1>Categorias</h1>
      {categories.length > 0 &&
        categories.map((category) => (
          <section
            key={category.id}
            className="border-b-placeholder space-y-6 border-b pb-6 first:border-t-0 first:pt-0"
          >
            <header className="flex flex-wrap items-start justify-between">
              <h3>{category.titulo}</h3>
              {category.videoGames && category.videoGames.length > 4 && (
                <Link to={`/categorias/${category.slug}`} className="primary-button">
                  Ver más
                </Link>
              )}
            </header>

            {category.videoGames && category.videoGames.length > 0 && (
              <div className="flex h-full grid-cols-4 gap-4 overflow-auto md:grid">
                {category.videoGames.slice(0, 4).map((videoGame) => (
                  <GameCardBasic key={videoGame.id} videoGame={videoGame} />
                ))}
              </div>
            )}

            {(!category.videoGames || category.videoGames.length === 0) && (
              <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay juegos disponibles</p>
            )}
          </section>
        ))}
    </section>
  );
}
