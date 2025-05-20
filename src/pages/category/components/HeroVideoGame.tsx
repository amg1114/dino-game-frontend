import { useParams } from "react-router";
import { GamePrice } from "../../../components/video-games/GamePrice";
import { useBestGame } from "../hooks/useBestGame";

export const HeroVideoGame: React.FC = () => {
    const slug = useParams().slug;
    const { game, loading } = useBestGame(slug || "");

    return (
        <section className="flex flex-wrap items-start gap-4 xl:justify-center">

            {loading && <p>Cargando...</p>}
            {!loading && game && (
                <div className="md:bg-placeholder relative h-auto w-full overflow-hidden rounded-lg md:aspect-video xl:flex-1 ">
                    <figure className="relative z-0 w-full">
                        <img src={game.thumb.url} alt={game.titulo} className="w-full" />
                    </figure>
                    <div className="absolute bottom-0 left-0 z-10 max-w-2/3 p-8 max-md:hidden ">
                        <h2 className="leading-none">{game.titulo}</h2>
                        <p className="mb-4 text-lg">{game.descripcion}</p>
                        <GamePrice videoGame={game} />
                    </div>
                    <div className="flex w-full flex-col md:hidden">
                        <h2 className="mb-2.5 mt-2 text-3xl leading-none">{game.titulo}</h2>
                        <p className="mb-2">{game.descripcion}</p>
                        <GamePrice videoGame={game} />
                    </div>
                    <span className="to-body/70 absolute inset-0 z-0 h-full w-full bg-linear-to-b from-transparent max-md:hidden"></span>
                </div>

            )}
            {!game && <></>}
        </section>
    );
}

