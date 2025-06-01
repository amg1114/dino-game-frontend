import { StyledInput } from '../../../../components/forms/StyledInput';
import { useReportes } from '../hooks/useReportsContext';

function SearchReport() {
    const { search, setSearch } = useReportes();

    return (
        <>
            <div className='w-full gap-10 pb-2 sm:w-lg '>
                <StyledInput
                    type="text"
                    placeholder="Búscar Reporte"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search-video-game"
                    label="Buscar"
                    name="search-video-game"
                    errors={[]}

                />
            </div>
        </>

    );
}

export default SearchReport;