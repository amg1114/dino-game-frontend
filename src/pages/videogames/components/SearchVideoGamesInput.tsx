import { StyledInput } from "../../../components/forms/StyledInput";
import { VideoGameInfoTarget } from "./VideoGameInfoTarget";
import { useSearchVideoGames } from "../hooks/useSearchVideoGames";

export function SearchVideoGamesInput() {
    const { inputTitle, handleFocus, handleInputChange, focus, dataBySearch, handleBlur } = useSearchVideoGames()
    console.log(focus)
    return (
        <div className="flex relative flex-col items-start justify-start w-full">
            <div className="-mt-8 w-full">

                <StyledInput
                    type="text"
                    placeholder="Búscar Juegos"
                    value={inputTitle}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    id="search-video-game"
                    label="Buscar"
                    name="search-video-game"
                    errors={[]}
                />
            </div>
            {dataBySearch.length > 0 && (
                <div className="absolute 
                bg-placeholder
                rounded-md mt-16 z-100 
                shadow-lg max-h-96 
                h-fit
                overflow-y-auto
                overflow-x-hidden
                w-full
                break-words
                p-2
                ">
                    {focus && dataBySearch.map((videoGame) => (
                        <VideoGameInfoTarget
                            key={videoGame.id}
                            videoGame={videoGame}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}