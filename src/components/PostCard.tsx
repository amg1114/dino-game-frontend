import { Edit, Eye, SquareArrowOutUpRight, Trash } from 'lucide-react';
import { Link } from 'react-router';
import { Post } from '../models/post.interface';
import { truncateDescription } from '../utils/truncateDescription';

export function PostCard({
  post,
  adminControls,
  onDelete,
}: {
  post: Post;
  adminControls?: boolean;
  onDelete?: (post: Post) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="md:w-mb bg-body flex h-full w-full flex-col">
        {post.thumb.url ? (
          <img
            className="bg-placeholder-2 mb-2 aspect-[16/9] w-full rounded-md object-cover"
            src={post.thumb.url}
            alt="news image"
          />
        ) : (
          <></>
        )}
        <div className="flex flex-1 flex-col">
          {adminControls && (
            <nav className="flex justify-end gap-2">
              <Link
                to={`/blog/${post.slug}`}
                className="bg-blue flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
              >
                <Eye />
              </Link>
              <Link
                to={`/dashboard/blog/${post.slug}/editar`}
                className="bg-green flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
              >
                <Edit />
              </Link>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(post)}
                  className="bg-red flex aspect-square cursor-pointer items-center justify-center rounded p-1 text-xl text-white transition-transform hover:scale-110"
                >
                  <Trash />
                </button>
              )}
            </nav>
          )}
          <h3 className="w-full leading-none text-white uppercase">{post.titulo}</h3>
          <p className="text-sm text-white">{truncateDescription(post.descripcion)}</p>
          {!adminControls && (
            <Link className="text-green mt-1 flex flex-row" to={'/blog/' + post.slug}>
              Ver más
              <SquareArrowOutUpRight className="stroke-green mt-2 size-3 stroke-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
