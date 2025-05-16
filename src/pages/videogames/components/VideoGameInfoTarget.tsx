import { Link } from "react-router";
import { VideoGame } from "../../../models/video-game.interface";

export interface VideoGameInfoTargetProps {
    titulo: VideoGame["titulo"];
    precio: VideoGame["precio"];
    descripcion: VideoGame["descripcion"];
    slug: VideoGame["slug"];
    thumb: VideoGame["thumb"];
}

export function VideoGameInfoTarget({ titulo, precio, descripcion, slug, thumb }: VideoGameInfoTargetProps) {
    return (
        <Link to={`juegos/${slug}`} className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={thumb.url} alt={`${thumb.title}-image`} />
            <h1 className="text-2xl font-bold text-white">{titulo}</h1>
            <p className="text-lg text-gray-300">{descripcion}</p>
            <p className="text-lg text-gray-300">Precio: ${precio}</p>
        </Link>
    );


}