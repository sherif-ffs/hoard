import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  pages: number;
  page: number;
  paginate: (e: any) => void;
}

const Pagination = (props: Props) => {
  const { pages, page, paginate } = props;

  if (pages && pages > 1) {
    return (
      <div className={styles.wrapper}>
        {page > 0 && (
          <button value={page - 1} onClick={paginate}>
            &#8592;
          </button>
        )}
        {[...Array(pages)].map((e, i) => (
          <button
            key={i}
            value={i}
            className={page == i ? styles.active : undefined}
            onClick={paginate}
          >
            {i + 1}
          </button>
        ))}
        {page < pages - 1 && (
          <button value={page + 1} onClick={paginate}>
            &#8594;
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default Pagination;
