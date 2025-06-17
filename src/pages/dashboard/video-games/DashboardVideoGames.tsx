import { Plus } from 'lucide-react';
import { StyledInput } from '../../../components/forms/StyledInput';
import { Pagination } from '../../../components/pagination';
import { GameCardBasic } from '../../../components/video-games/GameCardBasic';
import { useDashboardGames } from './hooks/useDashboardGames';
import { Link } from 'react-router';

export function DashboardVideoGames() {
  const { games, totalGames, itemsPerPage, page, searchTerm, permissions, setPage, setSearchTerm, handleDelete } =
    useDashboardGames();
  return (
    <>
      <section className="space-y-6">
        <header className="grid grid-cols-3 gap-6">
          <div className="col-span-full flex items-center gap-6">
            <h1>Juegos en la tienda</h1>
            {permissions.canCreate && (
              <Link to="/dashboard/juegos/crear" className="primary-button group">
                <Plus strokeWidth={4} />
              </Link>
            )}
          </div>
          <div className="col-span-full lg:col-span-2">
            <StyledInput
              id="search"
              name="search"
              label="Buscar"
              placeholder="Buscar Juegos por Titulo o Descripcion"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setPage(0);
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </header>
        {games.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {games.map((videoGame) => (
                <GameCardBasic
                  videoGame={videoGame}
                  key={videoGame.id}
                  adminPermissions={permissions}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <Pagination itemsPerPage={itemsPerPage} totalItems={totalGames} page={page} setPage={setPage} />
          </>
        )}
        {games.length == 0 && (
          <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No se encontraron Juegos</p>
        )}
      </section>
    </>
  );
}
