import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (n: number) => void;
    visibleButtons?: number; // opcional, default a 3
};

export function Pagination({ currentPage, totalPages, onPageChange, visibleButtons = 3 }: PaginationProps) {
    const pages = [];

    const half = Math.floor(visibleButtons / 2);
    const startPage = Math.max(1, currentPage - half);
    const endPage = Math.min(totalPages, currentPage + half);

    // Asegurar que siempre se muestren visibleButtons (si hay suficientes páginas)
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center gap-2 mt-4 bg-body p-2">
            {/* Flecha anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-white text-green rounded disabled:opacity-50 hover:bg-green hover:text-white"
            >
                <ChevronLeft />
            </button>

            {/* Botones de página */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded font-bold hover:cursor-pointer ${page === currentPage
                        ? "bg-green text-white"
                        : "bg-white text-green hover:bg-green hover:text-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Flecha siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 bg-white text-green rounded disabled:opacity-50 hover:bg-green hover:text-white"
            >
                <ChevronRight />
            </button>
        </div>
    );
}
