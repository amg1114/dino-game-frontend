import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AssetsSlider } from "../components/AssetsSlider";
import { VideoGame } from "../../../models/video-game.interface";
import { Calification } from "../components/Calification";
import { GamePrice } from "../../../components/video-games/GamePrice";

export function VideoGamePageInfo() {
    const { slug } = useParams();
    const [videoGame, setVideoGame] = useState(null);
    useEffect(() => {
        axios.get(`/api/video-games/${slug}`)
            .then((response) => {
                const game = response.data;
                game.assets = [...game.assets, game.thumb, game.hero];
                setVideoGame(game);
            })
            .catch((error) => {
                console.error("Error fetching video game data:", error);
            });
    }, [slug]);
    if (!videoGame) return null;
    const game: VideoGame = videoGame
    const fechaDeLanzamiento = new Date(game.fechaLanzamiento);
    const mes = fechaDeLanzamiento.toLocaleString("default", { month: "long" });
    const dia = fechaDeLanzamiento.getDate();
    const anio = fechaDeLanzamiento.getFullYear();
    const fechaFormateada = `${mes} ${dia}, ${anio}`;
    return (
        <>
            {
                game ? <>
                    <AssetsSlider videoGame={game} />
                    <div className="flex flex-col sm:flex-row mt-8 w-full xl:w-4/5 justify-between gap-10">
                        <div className="w-full mb-2">
                            <div className="flex w-full flex-col-reverse xl:flex-row border-b-2 border-b-placeholder pb-4">
                                <p>
                                    {fechaFormateada.toUpperCase()} <span className="opacity-20">&#124; </span>
                                    {game.developer.nombre} <span className="opacity-20">&#124; </span>
                                    {game.versions.length > 0 ? <> ({game.versions[0].version} <span className="opacity-20">&#124; </span>)</> : <></>}
                                </p>
                                <span className="md:ml-1">
                                    {<Calification />}
                                </span>
                            </div>
                            <div className="w-full border-b-2 border-b-placeholder pb-4">
                                <h2 className="uppercase mt-2">Descripción</h2>
                                <p>{game.descripcion}</p>
                            </div>

                        </div>
                        <div className="flex items-start justify-center sm:justify-end w-full sm:w-1/4">
                            <div className={`flex flex-col justify-center items-start w-full ${game.descuentos.length > 0 ? 'mt-8' : ''}`}>
                                <GamePrice
                                    videoGame={game}
                                    buttonClasses="w-full flex-1 h-8 text-lg flex items-center justify-center "
                                    currencyLabel="COP"
                                    wrapperClasses="w-full h-8 items-center justify-center"
                                    textClasses="text-md flex items-center w-full"
                                />
                                <div>
                                    {game.versions.length > 0 && game.versions[0].requisitos.length > 0 ? <>

                                        <h3 className="uppdercase mt-4">Requisitos</h3>
                                        {
                                            <div className=" flex gap-2 flex-wrap">
                                                {game.versions[0].requisitos.map((requisito, index) => (
                                                    <p key={index} className="secondary-button w-fit">{requisito.requisito}</p>
                                                ))}
                                            </div>
                                        }
                                    </> : <></>}

                                    {
                                        game.categorias.length > 0 ? <>
                                            <h3 className="uppdercase mt-4">Categorías</h3>
                                            {
                                                <div className="flex gap-2 flex-wrap mt-3">
                                                    {game.categorias.map((categoria, index) => (
                                                        <p key={index} className="thertiary-button w-fit">{categoria.titulo}</p>
                                                    ))}
                                                </div>
                                            }
                                        </> : <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </> : <></>
            }
        </>
    );
}