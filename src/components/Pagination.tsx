import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are less than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ... indicator
      if (currentPage <= 3) {
        // Show 1, 2, 3, 4, ...
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show 1, ..., n-3, n-2, n-1, n
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center p-2 rounded-md
                    ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-3 py-1 text-gray-500 dark:text-gray-400">
              ...
            </span>
          ) : (
            <button
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`px-3 py-1 rounded-md 
                         ${
                           currentPage === page
                             ? "bg-blue-500 text-white"
                             : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                         }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center p-2 rounded-md
                    ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
