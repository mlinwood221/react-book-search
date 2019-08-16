import React, { useCallback } from 'react';
import navigateIcon from '@mdi/svg/svg/chevron-left.svg';
import SvgButton from '../SvgButton';
import './style.scss';

type Props = {
  currentPage: number;
  pageCount: number;
  showPage: (page: number) => void;
};

const Pagination = ({ currentPage, pageCount, showPage }: Props) => {
  const handlePrevPage = useCallback(() => {
    showPage(currentPage - 1);
  }, [showPage, currentPage]);

  const handleNextPage = useCallback(() => {
    showPage(currentPage + 1);
  }, [showPage, currentPage]);

  return (
    <nav className="pagination">
      <div className="pagination__prev-button">
        <SvgButton
          onClick={handlePrevPage}
          icon={navigateIcon}
          data-testid="goto-prev-page"
        />
      </div>

      <span data-testid="current-page">
        Showing page {currentPage} of {pageCount}
      </span>

      <div className="pagination__next-button">
        <SvgButton
          onClick={handleNextPage}
          icon={navigateIcon}
          data-testid="goto-next-page"
        />
      </div>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default React.memo(Pagination);
