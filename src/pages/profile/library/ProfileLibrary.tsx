import { Pagination } from '../../../components/pagination';
import { UserGame } from '../../../components/video-games/UserGame';
import { useLibrary } from '../hooks/useLibrary';

export function ProfileLibrary() {
  const { usuario, videoGames, itemsPerPage, totalItems, page, setPage, fetchVideoGames } = useLibrary();

  return (
    <>
      {usuario && (
        <section>
          <h2>Mi Biblioteca</h2>
          {videoGames.length === 0 && (
            <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay juegos disponibles</p>
          )}
          {videoGames.length > 0 && (
            <>
              <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videoGames.map((userGame) => (
                  <UserGame videoGame={userGame.videoGame} key={userGame.id} onDelete={() => fetchVideoGames()} />
                ))}
              </div>
              <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} page={page} setPage={setPage} />
            </>
          )}
        </section>
      )}
    </>
  );
}
