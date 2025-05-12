import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  itemsPerPage,
  page,
  setPage,
  totalItems,
}: {
  itemsPerPage: number;
  page: number;
  setPage: (n: number) => void;
  totalItems: number;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {totalItems > itemsPerPage && (
        <nav className="flex w-full flex-wrap justify-center gap-4">
          {/* Previous Button */}
          {page > 0 && (
            <button type="button" className="thertiary-button thertiary-button--sm" onClick={() => setPage(page - 1)}>
              <ChevronLeft />
            </button>
          )}

          {/* Page Buttons */}
          {Array.from({ length: totalPages }, (_, index) => index)
            .filter((index) => index === page || index === page - 1 || index === page + 1)
            .map((index) => (
              <button
                key={index}
                type="button"
                className={clsx({
                  'thertiary-button thertiary-button--sm': page !== index,
                  'primary-button primary-button--sm': page === index,
                })}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            ))}

          {/* Next Button */}
          {page < totalPages - 1 && (
            <button type="button" className="thertiary-button thertiary-button--sm" onClick={() => setPage(page + 1)}>
              <ChevronRight />
            </button>
          )}
        </nav>
      )}
    </>
  );
}
