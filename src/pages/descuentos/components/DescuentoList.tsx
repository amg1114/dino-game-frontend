import { DescuentoCard } from "./DescuentoCard";
import { DescuentoColumnHeaders } from "./DescuentoColumnHeaders";
import { useDescuento } from "../hooks/useDescuento";
import { Link, Outlet, useParams } from "react-router";


export function DescuentoList() {
    const { id } = useParams();
    console.log(id);
    const { data, loading, error } = useDescuento(id ?? null);
    console.log(data);
    return (
        <div className="flex flex-col justify-between">

            <DescuentoColumnHeaders />
            <div>
                <div>
                    {loading && <p>Cargando...</p>}
                    {error && <p>{error}</p>}

                    {data &&
                        data.map((descuento) => (
                            <DescuentoCard key={descuento.id} descuento={descuento} />))}

                </div>
            </div>
            <div className="flex justify-end pt-3">
                <Link to={`/dashboard/juegos/${id}/descuentos/nuevo`} className="primary-button primary-button--xs mt-auto w-fit">Agregar</Link>
            </div>
            <Outlet />
        </div>

    );
}