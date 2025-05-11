import React, { useState } from 'react';
import { useCategoria } from '../hooks/useCategoria';
import { useParams } from 'react-router';
import { GameCardBasic, GameCardBasicPlaceholder } from '../../../components/video-games/GameCardBasic';
import { usePagination } from '../../../hooks/pagination/usePagination';
import { Pagination } from '../../../components/pagination';


const CategoriaList: React.FC = () => {
    const { slug } = useParams();
    const { data, loading, error } = useCategoria(slug || "");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const { paginatedData, totalPages } = usePagination(data, currentPage, itemsPerPage);

    const handlePageChange = (page: number) => {
        console.log("Cambiando a la página:", page);
        setCurrentPage(page);
    };

    return (
        <section>
            {error && <p className="bg-placeholder text-body rounded p-4 text-center uppercase">Esta Dinocategoria no existe</p>}
            {loading && (
                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <GameCardBasicPlaceholder key={index} />
                    ))}
                </div>
            )}
            {!loading && data.length && (<>
                <h2>
                    <span className="text-green">Dino</span>
                    {slug}
                </h2>
                <div className="space-y-9">
                    <div className="hidden grid-cols-4 gap-4 md:grid">
                        {paginatedData.map((videoGame) => (
                            <GameCardBasic key={videoGame.id} videoGame={videoGame} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </>
            )}
        </section>
    )
};

export default CategoriaList;