import { StarIcon } from "lucide-react";
import { VideoGame } from "../../../../models/video-game.interface";
import { useCalification } from "../../hooks/videogame/useCalification";

export function Calification({ game }: { game: VideoGame }) {

    const { calification, handleSetCalification, usuario } = useCalification(game);

    return (
        <>
            <div className="flex items-center gap-2">

                {[...Array(5)].map((_, i) =>
                    i < calification ? (
                        <StarIcon
                            key={i}
                            fill="#3dab7b"
                            color="#3dab7b"
                            onClick={() => handleSetCalification(i + 1)}
                            className={usuario && usuario?.tipo !== "ESTANDAR" ? " hover:cursor-auto" : "hover:w-5 hover:h-5 hover:cursor-pointer"}
                        />
                    ) : (
                        <StarIcon
                            key={i}
                            color="#3dab7b"
                            onClick={() => handleSetCalification(i + 1)}
                            className={usuario && usuario?.tipo !== "ESTANDAR" ? " hover:cursor-auto" : "hover:w-5 hover:h-5 hover:cursor-pointer"} />
                    )
                )}
                <p>{calification.toFixed(1)}</p>
            </div>
        </>
    )
}