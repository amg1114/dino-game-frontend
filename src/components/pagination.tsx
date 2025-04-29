import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (n: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-center gap-3 mt-4 bg-body p-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-white text-green rounded disabled:opacity-50"
            >
                <ChevronLeft />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded font-bold ${page === currentPage ? "bg-green text-white" : "bg-white text-green"
                        } p-2`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 bg-white text-green rounded disabled:opacity-50"
            >
                <ChevronRight />
            </button>
        </div>
    );
}