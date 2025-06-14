import { Link } from 'react-router';
import { useDashboardBlog } from './hooks/useDashboardBlog';
import { Plus } from 'lucide-react';
import { StyledInput } from '@components/forms/StyledInput';
import { PostCard } from '@components/PostCard';
import { Pagination } from '@components/pagination';

export function DashboardBlog() {
  const { posts, totalPosts, itemsPerPage, page, searchTerm, setSearchTerm, setPage } = useDashboardBlog();
  return (
    <>
      <section className="space-y-6">
        <header className="grid grid-cols-3 gap-6">
          <div className="col-span-full flex items-center gap-6">
            <h1>Publicaciones en la tienda</h1>

            <Link to="/dashboard/blog/crear" className="primary-button group">
              <Plus strokeWidth={4} />
            </Link>
          </div>
          <div className="col-span-full lg:col-span-2">
            <StyledInput
              id="search"
              name="search"
              label="Buscar"
              placeholder="Buscar Publicaciones por Titulo o Descripcion"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </header>
        {posts.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard post={post} key={post.id} adminControls />
              ))}
            </div>
            <Pagination itemsPerPage={itemsPerPage} totalItems={totalPosts} page={page} setPage={setPage} />
          </>
        )}
        {posts.length == 0 && (
          <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No se encontraron Publicaciones</p>
        )}
      </section>
    </>
  );
}
