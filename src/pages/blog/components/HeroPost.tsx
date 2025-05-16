import { SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { truncateDescription } from '../../../utils/truncateDescription';

interface HeroPostProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export function HeroPost({ title, description, image, slug }: HeroPostProps) {
  return (
    <div>
      <div className="relative aspect-[16/9] w-full">
        {image && <img className="h-full w-full rounded-lg object-cover" src={image} alt="Hero Image" />}

        <div className="absolute inset-0 z-10 hidden flex-col items-start justify-end bg-gradient-to-t from-black/60 to-transparent p-6 md:flex">
          <div className="w-full md:w-2/3">
            <h3 className="text-3xl text-white uppercase">{title}</h3>
            <p className="text-lg text-white">{truncateDescription(description)}</p>
            <Link
              className="mt-4 flex w-fit items-center rounded-sm bg-white px-4 py-2 font-medium text-black no-underline transition-colors hover:bg-gray-100"
              to={`/blog/${slug}`}
            >
              VER MÁS
              <SquareArrowOutUpRight className="stroke-green ml-2 size-4 stroke-2" />
            </Link>
          </div>
        </div>
        <span className="to-body/70 absolute inset-0 z-0 h-full w-full bg-linear-to-b from-transparent"></span>
      </div>

      <div className="mt-4 block px-2 md:hidden">
        <h3 className="text-2xl text-black uppercase">{title}</h3>
        <p className="text-sm text-white">{truncateDescription(description)}</p>
        <Link
          className="text-green mt-4 flex w-fit items-center rounded-sm bg-white px-4 py-2 font-medium no-underline transition-colors hover:bg-gray-800"
          to={`/blog/${slug}`}
        >
          VER MÁS
          <SquareArrowOutUpRight className="stroke-green ml-2 size-4 stroke-2" />
        </Link>
      </div>
    </div>
  );
}
