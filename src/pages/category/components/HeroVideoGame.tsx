import { useParams } from "react-router";
import { useBestGame } from "../../category/hooks/useCategoryPage";
import { GamePrice } from "../../../components/video-games/GamePrice";

export const HeroVideoGame: React.FC = () => {
    const slug = useParams().slug;
    const { game, loading } = useBestGame(slug || "");
    return (
        <section className="flex flex-wrap items-start gap-4 xl:justify-center">
            <div className="md:bg-placeholder relative h-auto w-full overflow-hidden rounded-lg md:aspect-video xl:flex-1 max-w-6xl items-center justify-center">
                {loading && <p>Cargando...</p>}
                {!loading && game && (
                    <div>
                        <figure className="relative z-0 w-full ">
                            <img src={game.hero.url} alt={game.hero.title} className="w-full opacity-60" />
                        </figure>
                        <div className="absolute bottom-0 left-0 z-10 max-w-2/3 p-8 max-md:hidden">
                            <h2 className="leading-none">{game.titulo}</h2>
                            <p className="mb-4 text-lg">{game.descripcion}</p>
                            <GamePrice videoGame={game} />
                        </div>
                    </div>

                )}
                {!loading && !game && <p>No se encontró un juego para esta categoría.</p>}
            </div>
        </section>
    );
}

