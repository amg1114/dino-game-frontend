import { Pagination } from '../../../components/pagination';
import { StyledInput } from '../../../components/forms/StyledInput';
import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useDevelopers } from './hook/UseDevelopers';
import { DeveloperCard } from './components/DevelopersCard';
import axios from 'axios';
import { Usuario } from '../../../models/user.interface';

export function ManageDevelopers() {
  const { desarrolladores, loading, page, itemsPerPage, setPage, totalItems } = useDevelopers();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Usuario[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setSearching(true);
      axios
        .get(`/api/users/developers?search=${encodeURIComponent(query)}&limit=${itemsPerPage}&offset=0`)
        .then((response) => {
          setSearchResults(response.data.data as Usuario[]);
        })
        .catch((error) => {
          setSearchResults([]);
          console.error('Error al buscar desarrolladores:', error);
        })
        .finally(() => setSearching(false));
    } else {
      setSearchResults([]);
    }
  }, [query, itemsPerPage]);

  useEffect(() => {
    if (location.state?.needsRefresh) {
      window.location.reload();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  if (loading) return <p>Cargando desarrolladores...</p>;
  if (!desarrolladores.length) return <p>No hay desarrolladores.</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>DESARROLLADORES EN LA TIENDA </h2>
      </div>

      <h4 className="my-3">Buscar</h4>
      <div className="mt-2 mb-4 md:w-1/2">
        <StyledInput
          id="searchDeveloper"
          type="input"
          placeholder="BUSCAR DESARROLLADOR"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid-cols- grid gap-4 pb-8 sm:grid-cols-2 md:grid-cols-3">
        {searching ? (
          <p>Buscando...</p>
        ) : query.trim() ? (
          searchResults.length > 0 ? (
            searchResults.slice(0, 15).map((dev) => <DeveloperCard key={dev.id} developer={dev} />)
          ) : (
            <p>No se encontraron desarrolladores.</p>
          )
        ) : (
          desarrolladores.slice(0, 15).map((dev) => <DeveloperCard key={dev.id} developer={dev} />)
        )}
      </div>

      {!query.trim() && (
        <Pagination itemsPerPage={itemsPerPage} page={page} setPage={setPage} totalItems={totalItems} />
      )}

      <Outlet />
    </div>
  );
}
