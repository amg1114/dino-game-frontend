import { useDescuento } from "../hooks/useDescuento";
import { DescuentoCard } from "./DescuentoCard";
import { DescuentoColumnHeaders } from "./DescuentoColumnHeaders";
import { Link, Outlet } from "react-router";

export function DescuentoList({ id }: { id: string | number }) {
    const { data, loading, error, ObtenerDescuentos } = useDescuento(id ?? null);

    return (
        <div className="flex flex-col justify-between">
            <div>
                {!loading && !error && data.length > 0 ? (<div className=" overflow-x-auto">
                    <div className="min-w-max w-full ">
                        <DescuentoColumnHeaders />
                        {data.map((descuento) => (
                            <DescuentoCard key={descuento.id} descuento={descuento} obtenerDescuentos={ObtenerDescuentos} />))}
                    </div>

                </div>
                ) : (<>
                    <div className="flex flex-col gap-4">
                        <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No existen descuentos para este videojuego</p>
                    </div>
                </>)}
            </div>
            <div className="flex justify-end pt-3">
                <Link to={`/dashboard/juegos/${id}/descuentos/nuevo`} className="primary-button primary-button--xs mt-auto w-fit">Agregar</Link>
            </div>
            <Outlet context={{ ObtenerDescuentos }} />
        </div>

    );
}