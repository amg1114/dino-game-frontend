import { SquarePlus } from "lucide-react";
import { CategoriaCard } from "./components/CategoriaCard";
import { Pagination } from "../../../components/pagination";
import { useSearchCategory, useCategories } from "./hooks/useCategories";
import { StyledInput } from "../../../components/forms/StyledInput";
import { Link, Outlet, useLocation } from "react-router";
import { useEffect } from "react";

export function ManageCategories() {
    const { categories, loading, page, itemsPerPage, setPage, totalItems, refetch } = useCategories();
    const { query, setQuery, result, } = useSearchCategory()
    const location = useLocation();

    useEffect(() => {
        if (location.state?.needsRefresh) {
            refetch();
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    if (loading) return <p>Cargando Categorias</p>;
    if (!categories) return <p>No hay categorias</p>;


    return (
        <div>
            <div className="flex">
                <h2>Categorias En La Tienda</h2>
                <Link to="create">
                    <SquarePlus className="my-2.5 ml-2 bg-green text-3xl text-white p-0.5 rounded stroke-2" />
                </Link>
            </div>
            <h4 className="my-3">buscar</h4>
            <div className="mt-2 mb-4 md:w-1/2">
                <StyledInput
                    id="searchCategory"
                    type="input"
                    placeholder="BUSCAR"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8">
                {(query.trim() ? result : categories).map((categoria) => (
                    <CategoriaCard key={categoria.id} categoria={categoria} />
                ))}
            </div>
            <div>
                {(!query.trim()) ?
                    <Pagination itemsPerPage={itemsPerPage} page={page} setPage={setPage} totalItems={totalItems} /> : null}
            </div>
            <Outlet />
        </div>
    );
}