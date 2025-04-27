import { useState } from "react";
import { HeroNoticia } from "./components/HeroNoticia";
import { useLastNews } from "./hooks/useLastNews";
import { useResponsiveItems } from "../../hooks/pagination/useItemsPerPage";
import { usePagination } from "../../hooks/pagination/usePagination";
import { Pagination } from "../../components/pagination";
import { CardNoticia } from "./components/CardNoticia";

export function NewsPage() {

    const { news, sortNews } = useLastNews();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = useResponsiveItems();
    const { paginatedData, totalPages } = usePagination(sortNews, currentPage, itemsPerPage);


    if (!news) return <p>No se encuentra la noticia</p>
    return (
        <main className="bg-body h-auto py-9">
            <div className="container md:w-6xl w-full h-auto">
                <div className="w-full aspect-[16/9] flex flex-col justify-center">
                    <HeroNoticia
                        title={news.titulo}
                        description={news.descripcion}
                        image={news.thumb.url}
                        slug={news.slug}
                    />
                </div>
                <div>
                    <h1 className="mt-10 mb-10">
                        <span className="text-green font-bebas">Dino</span>noticias
                    </h1>
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {paginatedData.map((noticia: any) => (
                                <CardNoticia
                                    title={noticia.titulo}
                                    image={noticia.thumb.url}
                                    description={noticia.descripcion}
                                    slug={noticia.slug}
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
        </main>
    );
}