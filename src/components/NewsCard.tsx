import { SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { News } from '../models/news.interface';
import { truncateDescription } from '../utils/truncateDescription';

export function NewsCard({ news }: { news: News }) {
  return (
    <div>
      <div className="md:w-mb bg-body aspect-[16/9] w-full">
        {news.thumb.url ? (
          <img
            className="bg-placeholder-2 mb-2 aspect-[16/9] w-full rounded-md object-cover"
            src={news.thumb.url}
            alt="news image"
          />
        ) : (
          <></>
        )}
        <div className="min-h-auto">
          <h3 className="w-full leading-none text-white uppercase">{news.titulo}</h3>
          <p className="text-sm text-white">{truncateDescription(news.descripcion)}</p>
          <Link className="text-green mt-1 flex flex-row" to={'/blog/' + news.slug}>
            Ver más
            <SquareArrowOutUpRight className="stroke-green mt-2 size-3 stroke-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
