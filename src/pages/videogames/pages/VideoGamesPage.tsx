import { StyledInput } from "../../../components/forms/StyledInput";
import { Pagination } from "../../../components/pagination";
import { GameCardBasic } from "../../../components/video-games/GameCardBasic";
import { CategoryFilterVideoGamesInput } from "../components/CategoryFilterVideoGamesInput";
import { SearchVideoGamesInput } from "../components/SearchVideoGamesInput";
import { useVideoGames } from "../hooks/useVideoGames";
import { Link } from "react-router";

export function VideoGamesPage() {

    const videoGamesState = useVideoGames();
    const { data, itemsPerPage, totalItems, setPage, page } = videoGamesState;

    return (
        <div>
            <div className="grid mt-8 w-full gap-8 grid-cols-2 sm:grid-cols-4 sm:gap-4">
                <div className="col-span-2">
                    <SearchVideoGamesInput />
                </div>
                <div>
                    <CategoryFilterVideoGamesInput
                        inputCategoria={videoGamesState.inputCategoria}
                        setInputCategoria={videoGamesState.setInputCategoria}
                    />
                </div>
                <div className="-mt-8">
                    <StyledInput
                        type="number"
                        placeholder="Ingrese un valor $"
                        value={videoGamesState.inputPrice}
                        onChange={videoGamesState.handleInputPriceChange}
                        id="input-price"
                        label="Precio"
                        name="input-price"
                        errors={[]}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-4">
                {data.map((videoGame) => (
                    <Link to={`/juegos/${videoGame.slug}`} key={videoGame.id} className="no-underline">
                        <GameCardBasic videoGame={videoGame} key={videoGame.id} />
                    </Link>
                ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                page={page}
                setPage={setPage}
            ></Pagination>
        </div>
    );
}