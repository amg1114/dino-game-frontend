import { Post } from '../../../models/post.interface';
import { SectionData } from '../hooks/useHomePage';
import { PostCard } from '../../../components/PostCard';

export function PostsSection({ data }: { data: SectionData<Post> }) {
  const { loading, error, data: posts } = data;

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
            {posts.map((post) => (
              <div className="min-w-64" key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
