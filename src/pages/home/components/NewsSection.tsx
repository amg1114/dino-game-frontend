import { News } from '../../../models/news.interface';
import { SectionData } from '../hooks/useHomePage';
import { NewsCard } from '../../../components/NewsCard';

export function NewsSection({ data }: { data: SectionData<News> }) {
  const { loading, error, data: news } = data;

  return (
    <section>
      <h2>
        <span className="text-green">Dino</span>
        Noticias
      </h2>
      {error && (
        <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay noticias disponibles</p>
      )}
      {!loading && !error && (
        <div className="space-y-9">
          <div className="flex grid-cols-3 gap-4 max-md:overflow-x-scroll md:grid">
            {news.map((newsItem) => (
              <div className="min-w-64">
                <NewsCard key={newsItem.id} news={newsItem} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
