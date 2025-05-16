import { Link } from "react-router";
import { VideoGame } from "../../../models/video-game.interface";
import { GamePrice } from "../../../components/video-games/GamePrice";

export interface VideoGameInfoTargetProps {
    titulo: VideoGame["titulo"];
    precio: VideoGame["precio"];
    descripcion: VideoGame["descripcion"];
    slug: VideoGame["slug"];
    thumb: VideoGame["thumb"];
}

export function VideoGameInfoTarget({ videoGame }: { videoGame: VideoGame }) {
    const { titulo, slug, thumb } = videoGame;
    return (
        <Link to={`juegos/${slug}`} className="no-underline flex align-top gap-4 hover:bg-placeholder-2 px-2 py-3">
            <img src={thumb.url} alt={`${thumb.title}-image`} className="w-30 h-24 sm:w-30 md:w-40" />
            <div className="flex flex-col h-24 p-0.5 justify-between items-start">
                <h4 className="decoration-none text-lg sm:text-2xl text-white -m-1 p-0 self-start ml-0.5">{titulo}</h4>
                <GamePrice videoGame={videoGame} wrapperClasses="text-white w-10 sm:w-20 gap-1 p-0.5" />
            </div>
        </Link>
    );


}