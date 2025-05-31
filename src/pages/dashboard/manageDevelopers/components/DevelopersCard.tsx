import { Trash, CalendarDays, Gamepad } from "lucide-react";
import { Usuario } from "../../../../models/user.interface"
import { useAlert } from "../../../../hooks/useAlert"
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatWithOptions } from "date-fns/fp";
import { es } from "date-fns/locale/es";

export function DeveloperCard({ developer }: { developer: Usuario }) {
    const { showAlert, showToast } = useAlert();
    const navigate = useNavigate();

    const [videoGameCount, setVideoGameCount] = useState<number>(0);

    useEffect(() => {
        axios
            .get(`/api/video-games/developer/${developer.id}/video-games`)
            .then((res) => {
                setVideoGameCount(res.data.length);
            })
            .catch((e) => {
                console.error("Error fetching video games:", e);
            });
    }, []);

    const handleDelete = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        showAlert({
            title: "Eliminar Desarrollador",
            message: "¿Estás seguro de que quieres eliminar este desarrollador?",
            type: "warning",
            isConfirm: true,
            onClose: async (confirm) => {
                if (!confirm) return;
                try {
                    await axios.delete(`/api/users/${developer.id}`);
                    showToast({
                        type: "success",
                        message: "Desarrollador eliminado correctamente",
                        duration: 2000,
                    });
                    navigate("/dashboard/desarrolladores", {
                        state: { needsRefresh: true },
                    });
                } catch {
                    showAlert({
                        title: "Error",
                        message: "No se pudo eliminar el desarrollador.",
                        type: "error",
                    });
                }
            },
        });
    };

    const formatDate = formatWithOptions({ locale: es });
    const formattedDate = formatDate(
        "MMMM dd 'de' yyyy",
        new Date(developer.fechaNacimiento)
    );

    return (
        <div className="w-full h-32 flex flex-col justify-between bg-placeholder p-4 rounded-md text-white shadow">
            <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold uppercase truncate">
                    {developer.nombre}
                </h4>
                <Trash
                    className="text-red hover:cursor-pointer stroke-2"
                    onClick={handleDelete}
                />
            </div>

            <div className="space-y-1 text-sm text-gray-200">
                <div className="flex items-center">
                    <CalendarDays className="text-green stroke-2 mr-2 w-4 h-4" />
                    <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                    <Gamepad className="text-green stroke-2 mr-2 w-4 h-4" />
                    <span>{videoGameCount} videojuego{videoGameCount !== 1 ? "s" : ""}</span>
                </div>
            </div>
        </div>
    );
}
