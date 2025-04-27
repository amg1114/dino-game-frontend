import { useParams } from "react-router-dom";
import { useNews } from "./hooks/useNews";
import { Heart } from "lucide-react";
import { CardNoticia } from "./components/CardNoticia";

export function VistaNoticia() {
    const { slug } = useParams<{ slug: string }>();
    const { news, relatedNews, loading, error } = useNews(slug || "");

    if (loading) return <p>Cargando noticia...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!news) return <p>No se encontró la noticia</p>

    const date = new Date(news.fecha);
    const opcionesMes = { month: "long" } as const;
    const mes = date.toLocaleDateString("es-ES", opcionesMes);

    const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

    const fechaFormateada = `${mesCapitalizado} ${date.getDate()}, ${date.getFullYear()}`;


    return (
        <main className="bg-body h-auto py-9">

            <div className="container w-3xl ">
                <div className="w-full aspect-[16/9] flex flex-col justify-center">
                    <img className="rounded-b-md" src={news.thumb?.url} alt="news image" />
                    <div className="w-md grid grid-cols-3">
                        <p className="mt-2 mr-2 font-roboto text-xl border-r">{fechaFormateada}</p>
                        <p className="mt-2 mr-1 font-roboto text-xl border-r">Gina Paola</p>
                        <p className="mt-2 font-roboto text-xl flex flex-row ">
                            <Heart className="mr-2 ml-2 fill-placeholder-2 stroke-placeholder-2" />
                            {news.cantidadLikes}
                        </p>
                    </div>
                    <h1 className="mt-2">{news.titulo}</h1>
                    <p className="w-full">{news.descripcion}</p>
                </div>

            </div>
            <div className="mt-20 border-t pt-20 w-5xl aspect-[16/9] ml-60">
                <h2 className="text-2xl font-semibold mb-2"><span className="text-green uppercase font-bebas">dino</span>noticias recientes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-36 mt-5">
                    {relatedNews.slice(0, 3).map((item) => (
                        <CardNoticia
                            title={item.titulo}
                            image={item.thumb.url}
                            description={item.descripcion}
                            slug={item.slug}
                        />
                    ))}
                </div>
            </div>

        </main>
    );
}