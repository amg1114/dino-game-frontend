import { SquarePen, Trash, Gamepad } from "lucide-react";
import { Categoria } from "../../../models/categoria.interface";
import { truncateDescription } from "../../../utils/truncateDescription";
import { Link } from "react-router";

export function CategoriaCard({ categoria }: { categoria: Categoria }) {

    return (
        <div className="w-full md:max-w-3xs lg:max-w-xl relative flex flex-col bg-placeholder aspect-[16/9] p-4 rounded-md">
            <div className="flex flex-row justify-between uppercase mb-1">
                <div className="md:text-sm lg:text-mb font-bold">
                    {categoria.titulo}
                </div>
                <div className="flex gap-1 mt-1 md:text-sm lg:text-xl stroke-2">
                    <Link to={`/dashboard/categorias/update/${categoria.slug}`}>
                        <SquarePen className="text-green" />
                    </Link>
                    <Trash className="text-red" />
                </div>
            </div>
            <div className="flex-1 min-h-1 overflow-y-hidden mt-2">
                <p className="text-mb line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                    {truncateDescription(categoria.descripcion)}
                </p>
            </div>
            <div className="absolute bottom-2">
                <Gamepad className="md:text-mb lg:text-2xl text-green stroke-2" />
            </div>
        </div>
    );
}