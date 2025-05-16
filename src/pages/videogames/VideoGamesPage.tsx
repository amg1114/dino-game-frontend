import { SearchVideoGamesInput } from "./components/SearchVideoGamesInput";

export function VideoGamesPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-4">Videojuegos</h1>
            <div className="flex justify-center mt-4">
                <SearchVideoGamesInput />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            </div>
        </div>
    );
}