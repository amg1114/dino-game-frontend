import { StyledInput } from "../../../components/forms/StyledInput";
import { VideoGameInfoTarget } from "./VideoGameInfoTarget";
import { useSearchVideoGames } from "../hooks/useSearchVideoGames";

export function SearchVideoGamesInput() {
    const { inputTitle, handleFocus, handleInputChange, focus, dataBySearch } = useSearchVideoGames()

    return (
        <div className="flex items-center justify-center relative">
            <StyledInput
                type="text"
                placeholder="Buscar videojuego"
                value={inputTitle}
                onChange={handleInputChange}
                onFocus={handleFocus}
                id="search-video-game"
                label="Buscar videojuego"
                name="search-video-game"
                errors={[]}
            />
            {focus && dataBySearch.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-w-xs">
                    {dataBySearch.map((videoGame) => (
                        <VideoGameInfoTarget
                            titulo={videoGame.titulo}
                            precio={videoGame.precio}
                            descripcion={videoGame.descripcion}
                            slug={videoGame.slug}
                            thumb={videoGame.thumb}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}