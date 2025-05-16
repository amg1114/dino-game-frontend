import axios from "axios";
import { useEffect, useState } from "react";
import { Report } from "../../../models/report.interface";

export interface FetchResponse<T> {
    data: T[];
}

export function useReportesPage() {

    const [data, setData] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null)
        axios
            .get('/api/reports')
            .then(function (resp) {
                const data = resp.data.data;
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(function (err) {
                console.error(err);
            });
    }, [])

    return { data, loading, error };
}