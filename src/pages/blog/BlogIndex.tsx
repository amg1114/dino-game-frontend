import { useState } from "react";
import { HeroNoticia } from "./components/HeroNoticia";
import { useLastNews } from "./hooks/useNews";
import { useResponsiveItems } from "../../hooks/pagination/useItemsPerPage";
import { usePagination } from "../../hooks/pagination/usePagination";
import { Pagination } from "../../components/pagination";
import { CardNoticia } from "../../components/CardNoticia";

export function NewsPage() {

    const { news, relatedNews, loading } = useLastNews();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = useResponsiveItems({ smallScreen: 4, largeScreen: 9 });
    const { paginatedData, totalPages } = usePagination(relatedNews, currentPage, itemsPerPage);

    if (loading) return <p>Cargando Blog</p>
    if (!news) return <p>No se encuentra la noticia</p>
    return (
        <div className="container-blog w-full md:max-w-screen-xl mx-auto flex flex-col items-center">
            <div>
                <HeroNoticia
                    title={news.titulo}
                    description={news.descripcion}
                    image={news.thumb.url}
                    slug={news.slug}
                />
            </div>
            <div className="border-t border-b mt-10 pb-10 text-placeholder-2">

                <h1 className="mt-10 mb-10 text-white">
                    <span className="text-green font-bebas">Dino</span>noticias
                </h1>

                <section>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        {paginatedData.map((noticia) => (
                            <CardNoticia key={noticia.id} news={noticia}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                </section>
            </div>
        </div>

    );
}