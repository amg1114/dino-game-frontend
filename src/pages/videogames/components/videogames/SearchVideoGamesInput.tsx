import { StyledInput } from '../../../../components/forms/StyledInput';
import { VideoGameInfoTarget } from './VideoGameInfoTarget';
import { useSearchVideoGames } from '../../hooks/videogames/useSearchVideoGames';

export function SearchVideoGamesInput() {
  const { inputTitle, handleFocus, handleInputChange, focus, dataBySearch, handleBlur } = useSearchVideoGames();
  return (
    <div className="relative flex w-full flex-col items-start justify-start">
      <div className="-mt-8 w-full">
        <StyledInput
          type="text"
          placeholder="Búscar Juegos"
          value={inputTitle}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id="search-video-game"
          label="Buscar"
          name="search-video-game"
          errors={[]}
        />
      </div>
      {focus && dataBySearch.length > 0 && (
        <div className="bg-placeholder absolute z-100 mt-16 h-fit max-h-96 w-full overflow-x-hidden overflow-y-auto rounded-md p-2 break-words shadow-lg">
          {dataBySearch.map((videoGame) => (
            <VideoGameInfoTarget key={videoGame.id} videoGame={videoGame} />
          ))}
        </div>
      )}
    </div>
  );
}
