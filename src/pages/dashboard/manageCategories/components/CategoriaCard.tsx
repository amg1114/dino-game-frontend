import { SquarePen, Trash, Gamepad } from "lucide-react";
import { Categoria } from "../../../../models/categoria.interface";
import { truncateDescription } from "../../../../utils/truncateDescription";
import { Link, useNavigate } from "react-router";
import { useAlert } from "../../../../hooks/useAlert";
import axios from "axios";
import { useEffect, useState } from "react";


export function CategoriaCard({ categoria }: { categoria: Categoria }) {
    const { showAlert, showToast } = useAlert();
    const navigate = useNavigate();
    const [videoGames, setVideoGames] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/categorias?withGames=true')
            .then((resp) => {
                const respuesta = resp.data.data;
                const categoriaConJuegos = respuesta.find((cat: Categoria) => cat.id === categoria.id);
                setVideoGames(categoriaConJuegos?.videoGames?.length || 0);
            });
    }, [categoria.id]);


    const handleDelete = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault()
        showAlert({
            title: "Eliminar Categoría",
            message: "¿Estás seguro de que quieres eliminar esta categoría?",
            type: "warning",
            isConfirm: true,
            onClose: async (confirm) => {
                if (!confirm) return;

                try {
                    await axios.delete(`/api/categorias/${categoria.id}`);
                    showToast({
                        type: "success",
                        message: "Categoría eliminada correctamente",
                        duration: 2000
                    });
                    navigate("/dashboard/categorias", { state: { needsRefresh: true } });
                } catch {
                    showAlert({
                        title: "Error",
                        message: "",
                        type: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="w-full md:max-w-3xs lg:max-w-xl relative flex flex-col bg-placeholder aspect-[16/9] p-4 rounded-md">
            <div className="flex flex-row justify-between uppercase mb-1">
                <div className="md:text-sm lg:text-mb">
                    <h4>{categoria.titulo}</h4>
                </div>
                <div className="flex gap-1 mt-1 md:text-sm lg:text-xl stroke-2">
                    <Link to={`/dashboard/categorias/update/${categoria.slug}`}>
                        <SquarePen className="text-green" />
                    </Link>
                    <Trash className="text-red hover:cursor-pointer" onClick={handleDelete} />

                </div>
            </div>
            <div className="flex-1 min-h-1 overflow-y-hidden mt-2">
                <p className="text-mb line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                    {truncateDescription(categoria.descripcion)}
                </p>
            </div>
            <div className="flex absolute bottom-2">
                <Gamepad className="text-2xl text-green stroke-2" />
                <p className="ml-1 text-sm md:text-mb mt-0.5">{videoGames}</p>
            </div>
        </div>
    );
}