import { AssetsSlider } from "../components/videogames/AssetsSlider";
import { Calification } from "../components/videogame/Calification";
import { GamePrice } from "../../../components/video-games/GamePrice";
import { CommentsSection } from "../components/videogame/CommentsSection";
import { useVideoGameInfo } from "../hooks/videogame/useVideoGameInfo";
import { Requisito } from "../../../models/requisitos.interface";
import { Categoria } from "../../../models/categoria.interface";

export function VideoGamePageInfo() {
    const videoGameInfo = useVideoGameInfo();
    if (!videoGameInfo) return null;
    const { game, fechaFormateada, fetchData } = videoGameInfo;
    return (
        <>
            {
                game ? <>
                    <AssetsSlider videoGame={game} />
                    <div className="flex flex-col sm:flex-row mt-8 w-full xl:w-4/5 justify-between gap-x-10 gap-y-3">
                        <div className="w-full mb-2">
                            <div className="flex w-full flex-col-reverse xl:flex-row border-b-2 border-b-placeholder pb-4">
                                <p>
                                    {fechaFormateada.toUpperCase()} <span className="opacity-20">&#124; </span>
                                    {game.developer.nombre} <span className="opacity-20">&#124; </span>
                                    {game.versions.length > 0 ? <> ({game.versions[0].version}) <span className="opacity-20">&#124; </span></> : <></>}
                                </p>
                                <span className="md:ml-1">
                                    {<Calification game={game} />}
                                </span>
                            </div>
                            <div className="w-full border-b-2 border-b-placeholder pb-4">
                                <h2 className="uppercase mt-2">Descripción</h2>
                                <p>{game.descripcion}</p>
                            </div>
                            <div className="hidden sm:block w-full mt-2">
                                <CommentsSection comentarios={game.comentarios} fetchData={fetchData} />
                            </div>

                        </div>
                        <div className="flex items-start justify-center sm:justify-end w-full sm:max-w-60">
                            <div className={`flex flex-col justify-center items-start w-full ${game.descuentos.length > 0 ? 'mt-2 sm:mt-8' : ''}`}>
                                <GamePrice
                                    videoGame={game}
                                    buttonClasses="w-full flex-1 h-8 text-lg flex items-center justify-center "
                                    currencyLabel="COP"
                                    wrapperClasses="w-full h-8 items-center justify-center"
                                    textClasses="text-md flex items-center w-full"
                                />
                                {game.versions.length > 0 && game.versions[0].requisitos.length > 0 ? <>

                                    <h3 className="uppdercase mt-4">Requisitos</h3>
                                    {
                                        <div className=" flex gap-2 flex-wrap">
                                            {game.versions[0].requisitos.map((requisito: Requisito, index: number) => (
                                                <p key={index} className="secondary-button w-fit">{requisito.requisito}</p>
                                            ))}
                                        </div>
                                    }
                                </> : <></>}

                                {
                                    game.categorias.length > 0 ? <>
                                        <h3 className="uppdercase mt-4">Categorías</h3>
                                        {
                                            <div className="flex gap-2 flex-wrap w-full mt-3 border-b-2 border-b-placeholder sm:border-none pb-4 sm:ob-0">
                                                {game.categorias.map((categoria: Categoria, index: number) => (
                                                    <p key={index} className="thertiary-button w-fit">{categoria.titulo}</p>
                                                ))}
                                            </div>
                                        }
                                    </> : <></>
                                }
                                <div className="block sm:hidden w-full">
                                    <CommentsSection comentarios={game.comentarios} fetchData={fetchData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <></>
            }
        </>
    );
}