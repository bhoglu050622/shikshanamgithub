import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export default function BlogPagination({ 
  currentPage, 
  totalPages, 
  baseUrl,
  className = '' 
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={`flex items-center justify-center gap-1 sm:gap-2 ${className}`}>
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
        className={`
          flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg border transition-colors text-sm
          ${currentPage > 1
            ? 'border-blog-border-light hover:bg-blog-primary-50 text-blog-text-primary'
            : 'border-blog-border-light/50 text-blog-text-muted cursor-not-allowed'
          }
        `}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="px-2 sm:px-3 py-2 text-blog-text-muted">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={`${baseUrl}?page=${pageNum}`}
              className={`
                px-2 sm:px-3 py-2 rounded-lg border transition-colors min-w-[32px] sm:min-w-[40px] text-center text-sm
                ${isCurrentPage
                  ? 'bg-blog-primary-600 text-white border-blog-primary-600'
                  : 'border-blog-border-light hover:bg-blog-primary-50 text-blog-text-primary'
                }
              `}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link
        href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'}
        className={`
          flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg border transition-colors text-sm
          ${currentPage < totalPages
            ? 'border-blog-border-light hover:bg-blog-primary-50 text-blog-text-primary'
            : 'border-blog-border-light/50 text-blog-text-muted cursor-not-allowed'
          }
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}
