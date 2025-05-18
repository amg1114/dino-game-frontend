import axios from "axios";
import { useEffect, useState } from "react";
import { Report } from "../../../models/report.interface";
import { usePagination } from "../../../hooks/usePagination";

export interface FetchResponse<T> {
    data: T[];
}

export function useReportesPage() {

    const [data, setData] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { itemsPerPage, page, setPage } = usePagination([{ itemsPerPage: 4, windowWidth: 768 }], 15)
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError(null)
        axios
            .get(`/api/reports?limit=${itemsPerPage}&offset=${page}`)
            .then(function (resp) {
                const data = resp.data.data;
                console.log(data);
                setData(data);
                setLoading(false);
                setTotalItems(resp.data.total);
            })
            .catch(function (err) {
                console.error(err);
            });
    }, [page, itemsPerPage])

    return { data, loading, error, itemsPerPage, totalItems, page, setPage };
}