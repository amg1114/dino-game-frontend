import { useEffect, useState } from "react";
import { VideoGame } from "../../../models/video-game.interface";
import axios from "axios";
import { usePagination } from "../../../hooks/usePagination";

export function useVideoGames() {
    const [data, setData] = useState<VideoGame[]>([]);
    const [dataBySearch, setDataBySearch] = useState<VideoGame[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [inputTitle, setInputTitle] = useState<string>("");
    const [inputPrice, setInputPrice] = useState<number>(0);
    const [inputCategoria, setInputCategoria] = useState<string>("");
    const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 768 }], 9)


    useEffect(() => {
        const ENDPOINT = `/api/videogames?limit=${itemsPerPage}&offset=${page}` + (inputPrice ? `&precio=${inputPrice}` : "") + (inputCategoria ? `&categoria=${inputCategoria}` : "");
        setLoading(true);

        axios.get<VideoGame[]>(ENDPOINT)
            .then((response) => {
                setData(response.data);
            }
            )
            .catch((error) => {
                setLoading(false);
                setData([]);
                console.error("Error fetching data:", error);
            }
            );
    }, [page, itemsPerPage, inputPrice, inputCategoria]);

    useEffect(() => {
        const ENDPOINT = `/api/videogames?titulo=${inputTitle}`;
        setLoading(true);
        axios.get<VideoGame[]>(ENDPOINT)
            .then((response) => {
                setDataBySearch(response.data);
            }
            )
            .catch((error) => {
                setLoading(false);
                setDataBySearch([]);
                console.error("Error fetching data:", error);
            }
            );
    }, [inputTitle]);
    return {
        data,
        loading,
        itemsPerPage,
        page,
        dataBySearch,
        inputPrice,
        inputCategoria,
        inputTitle,
        setInputTitle,
        setInputPrice,
        setInputCategoria,
        setPage,
        setDataBySearch,
    };

}