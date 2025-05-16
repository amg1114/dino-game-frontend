import { useState } from "react";
import { useVideoGames } from "./useVideoGames";

export function useSearchVideoGames() {
    const { dataBySearch, setInputTitle, inputTitle } = useVideoGames();
    const [focus, setFocus] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputTitle(value);
    };

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    return {
        dataBySearch,
        setInputTitle,
        inputTitle,
        handleInputChange,
        handleFocus,
        focus,
        handleBlur,
    };
}