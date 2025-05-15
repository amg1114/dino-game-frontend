import { useCategoria } from '../hooks/useCategoria';
import { useParams } from 'react-router';
import { GameCardBasic, GameCardBasicPlaceholder } from '../../../components/video-games/GameCardBasic';
import { Pagination } from '../../../components/pagination';

const CategoriaList: React.FC = () => {
    const { slug } = useParams();
    const { data, loading, error, itemsPerPage, totalItems, page, setPage } = useCategoria(slug || "");

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
            {!loading && data.length > 0 && (<>
                <h2>
                    <span className="text-green">Dino</span>
                    {slug}
                </h2>
                <div className="space-y-9">
                    <div className=" grid-cols-4 gap-4 md:grid sx:gap-6">
                        {data.map((videoGame) => (
                            <GameCardBasic key={videoGame.id} videoGame={videoGame} wrapperExtraClasses='py-4' />
                        ))}
                    </div>

                </div>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    page={page}
                    setPage={setPage} />
            </>
            )}
        </section>
    )
};

export default CategoriaList;