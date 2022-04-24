import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAuthContext } from '../../contexts/AuthContext';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
import Loading from '../ui/Loading';
import NothingFound from '../ui/NothingFound';

import styles from './Items.module.scss';

interface Props {
  filterList: string[];
}
const Items = (props: Props) => {
  const { user } = useAuthContext();
  const [limit] = useState(25);
  const [gridSize, setGridSize] = useState(350);
  const [hideText, setHideText] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsToRender, setItemsToRender] = useState<any>([]);
  const { ref, inView } = useInView({
    rootMargin: '200px 0px',
  });

  const { filterList } = props;

  const { data, error, status } = useAllItems(limit, page * limit, filterList);

  const itemObjects =
    data &&
    data.data &&
    data.data.items &&
    !!data.data.items.length &&
    data.data.items;

  useEffect(() => {
    if (itemObjects) {
      const d = [...itemsToRender, ...itemObjects];
      setItemsToRender(d);
    }
  }, [itemObjects]);

  const itemCount = data && data.data && data.data.itemCount;

  useEffect(() => {
    if (inView) {
      paginate(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (gridSize <= 300) {
      setHideText(true);
      return;
    }

    if (hideText) {
      setHideText(false);
    }
  }, [gridSize]);

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  if (status === 'loading') return <Loading copy={'Loading Items'} />;

  const paginate = (p: number) => {
    setPage(p);
  };

  const updateGrid = (e: any) => {
    const newGridSize = e.target.value;
    setGridSize(newGridSize);
  };

  const browserWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );

  const test = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${gridSize}px, 1fr))`,
    gap: '1rem',
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          type="range"
          min="50"
          max={browserWidth / 3}
          value={gridSize}
          onChange={updateGrid}
        />
      </div>

      <div className={styles.wrapper} style={test}>
        {!itemsToRender && <NothingFound />}
        {itemsToRender &&
          itemsToRender.map((item: any, i: number) => {
            const isMyItem = user && user._id === item.userId;
            const isPublic = !item.isPrivate;
            if (isPublic || isMyItem) {
              return (
                <ItemCard
                  {...{
                    isMyItem,
                    item,
                    hideText,
                  }}
                  key={i}
                />
              );
            }
          })}
      </div>
      {itemCount > itemsToRender.length ? (
        <div ref={ref}>
          <Loading copy="loading more" />
        </div>
      ) : (
        <h3
          style={{
            margin: 'auto',
            width: 'min-content',
            whiteSpace: 'nowrap',
            fontWeight: 'normal',
          }}
        >
          You've seen it all friend!
        </h3>
      )}
    </>
  );
};

export default Items;
