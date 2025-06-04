import { Outlet } from "react-router";
import { StyledInput } from "../../../components/forms/StyledInput";
import { Pagination } from "../../../components/pagination";
import { DevRequestCard } from "./components/DevRequestCard";
import { useRequest, useSearch } from "./hooks/useRequest";
import { useLocation } from "react-router";
import { useEffect } from "react";

export function ManageDevRequest() {

    const { request, loading, setPage, page, totalItems, itemsPerPage, refetch } = useRequest();
    const { query, setQuery, result } = useSearch();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.needsRefresh) {
            refetch();
            window.history.replaceState({}, document.title);
        }
    }, [location.state])

    if (loading) return <p>cargando Solicitudes</p>
    if (request.length === 0) return <p>No hay solicitudes pendientes</p>

    return (
        <div>
            <h3>Solicitudes Para Desarrollador</h3>
            <h4 className="mt-6">Buscar </h4>
            <div className="mb-6 mt-2.5 w-1/2">
                <StyledInput
                    id="search-request"
                    type="input"
                    placeholder="Buscar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                {(query.trim() ? result : request).map((req => (
                    <DevRequestCard key={req.id} request={req} />
                )))}
            </div>
            <div>
                {(!query.trim()) ?
                    <Pagination itemsPerPage={itemsPerPage} page={page} setPage={setPage} totalItems={totalItems} /> : null}
            </div>
            <Outlet />
        </div>
    );
}