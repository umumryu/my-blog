import Link from 'next/link';
import styles from './Pagination.module.css';

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  perPage?: number;
  basePath?: string;
};

export default function Pagination({ 
  totalCount, 
  currentPage, 
  perPage = 6, 
  basePath = '/page' 
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);
  
  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 6; // 表示するページ数
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav className={styles.pagination} aria-label="ページナビゲーション">
      <div className={styles.paginationContainer}>
        {/* 前のページボタン */}
        {currentPage > 1 && (
          <Link 
            href={currentPage === 2 ? '/' : `${basePath}/${currentPage - 1}`}
            className={styles.paginationButton}
            aria-label="前のページ"
          >
            PREV
          </Link>
        )}

        {/* ページ番号 */}
        <div className={styles.pageNumbers}>
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }
            
            const pageNum = page as number;
            const isCurrentPage = pageNum === currentPage;
            const href = pageNum === 1 ? '/' : `${basePath}/${pageNum}`;
            
            return (
              <Link
                key={pageNum}
                href={href}
                className={`${styles.pageNumber} ${isCurrentPage ? styles.currentPage : ''}`}
                aria-label={`ページ ${pageNum}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* 次のページボタン */}
        {currentPage < totalPages && (
          <Link 
            href={`${basePath}/${currentPage + 1}`}
            className={styles.paginationButton}
            aria-label="次のページ"
          >
            NEXT
          </Link>
        )}
      </div>
    </nav>
  );
} 