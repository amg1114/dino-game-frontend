import axios from "axios";
import { useEffect, useState } from "react";
import { usePagination } from "../../../../hooks/usePagination";
import { Categoria } from "../../../../models/categoria.interface";

interface CategoriaRetornada {
    categories: Categoria[];
    loading: boolean;
    page: number;
    itemsPerPage: number;
    setPage: (page: number) => void;
    totalItems: number;
}

export function useCategories(): CategoriaRetornada & { refetch: () => void } {
    const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 3, windowWidth: 760 }], 9);
    const [categories, setCategories] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    const fecthCategories = () => {
        setLoading(true);
        axios
            .get(`/api/categorias?limit=${itemsPerPage}&offset=${page}`)
            .then(function (resp) {
                setCategories(resp.data.data);
                setTotalItems(resp.data.total);
                setLoading(false);
            })
            .catch(function (err) {
                console.error(err);
                setLoading(false);
            });
    }

    useEffect(() => {

        fecthCategories();


    }, [page]);

    return { categories: categories, loading, page, itemsPerPage, setPage, totalItems, refetch: fecthCategories }
}

interface searchProps {
    query: string
    setQuery: (query: string) => void
    result: Categoria[]
}

export function useSearchCategory(): searchProps {

    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/categorias?search=${query}`)
            .then(function (resp) {
                setResult(resp.data.data);
            })
            .catch(function (err) {
                console.error(err);
            })
    }, [query]);

    return { query, setQuery, result }
}
