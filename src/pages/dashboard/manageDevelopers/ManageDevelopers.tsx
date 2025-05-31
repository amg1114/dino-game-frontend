import { Pagination } from "../../../components/pagination";
import { StyledInput } from "../../../components/forms/StyledInput";
import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDevelopers } from "./hook/useDevelopers";
import { DeveloperCard } from "./components/DevelopersCard";

export function ManageDevelopers() {
    const { desarrolladores, loading, page, itemsPerPage, setPage, totalItems } = useDevelopers();
    const location = useLocation();

    const [query, setQuery] = useState("");

    const filteredDevelopers = desarrolladores.filter(dev =>
        dev.nombre.toLowerCase().includes(query.toLowerCase()) ||
        dev.correo.toLowerCase().includes(query.toLowerCase())
    );

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
            <div className="flex items-center justify-between ">
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

            <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8 min-h-[450px]">
                {(query.trim() ? filteredDevelopers : desarrolladores).slice(0, 15).map((dev) => (
                    <DeveloperCard key={dev.id} developer={dev} />
                ))}
            </div>


            {!query.trim() && (
                <Pagination
                    itemsPerPage={itemsPerPage}
                    page={page}
                    setPage={setPage}
                    totalItems={totalItems}
                />
            )}

            <Outlet />
        </div>
    );
}
