import { useParams } from "react-router";
import { useNews } from "./hooks/useNews";
import { Heart } from "lucide-react";
import { CardNoticia } from "../../components/CardNoticia";

export function VistaNoticia() {
    const { slug } = useParams<{ slug: string }>();
    const { news, relatedNews, loading } = useNews(slug || "");

    if (loading) return <p>Cargando noticia...</p>;
    if (!news) return <p>No se encontró la noticia</p>

    const date = new Date(news.fecha);
    const opcionesMes = { month: "long" } as const;
    const mes = date.toLocaleDateString("es-ES", opcionesMes);

    const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

    const fechaFormateada = `${mesCapitalizado} ${date.getDate()}, ${date.getFullYear()}`;


    return (
        <div>
            <div className="w-full md:w-[80%] lg:w-1/2 mx-auto">
                <div className="w-full aspect-[16/9] flex flex-col sm:min-w-[90%] max-w-[90%]">
                    <img className="rounded-xl" src={news.thumb?.url} alt="news image" />
                    <div className="mt-4 flex flex-row text-sm md:w-2/3 justify-start">
                        <time dateTime={news.fecha} className="leading-none pr-2 font-roboto border-r-placeholder-2 border-r-2 text-white">{fechaFormateada}</time>
                        <p className="leading-none px-2 font-roboto border-r-placeholder-2 border-r-2 text-white">{news.autor.nombre}</p>
                        <div className="items-center px-2 flex flex-row">
                            <span className=" leading-none  pr-1 fill-placeholder-2 stroke-placeholder-2 text-xs">
                                <Heart />
                            </span>
                            <span className="leading-none  text-sm text-white">{news.cantidadLikes}</span>
                        </div>
                    </div>
                    <h1 className="mt-2 w-auto">{news.titulo}</h1>
                    <p className="w-full" dangerouslySetInnerHTML={{ __html: news.descripcion }}></p>
                </div>
            </div>

            <div className="mt-5 pt-5 border-t text-placeholder-2">
                <h2 className="mb-2 text-white">
                    <span className="text-green uppercase font-bebas">dino</span>
                    noticias recientes
                </h2>

                <div className="flex overflow-x-auto space-x-4 mt-5 px-2 md:grid grid-cols-3 overflow-visible">
                    {relatedNews.slice(0, 3).map((item) => (
                        <div key={item.id} className="min-w-[90%] max-w-[90%] flex-shrink-0">
                            <CardNoticia news={item} />
                        </div>
                    ))}
                </div>
            </div>

        </div>

    );
}