import { useMemo } from "react";

export const usePagination = <T,>(data: T[], currentPage: number, itemsPerPage: number) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    return { paginatedData, totalPages };
};
