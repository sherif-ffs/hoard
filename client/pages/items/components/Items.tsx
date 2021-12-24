import React, { useState, useEffect } from 'react';
import { InView } from 'react-intersection-observer';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
import styles from './Items.module.scss';
import gridStyles from '../../../styles/_cardGrid.module.scss';

import Loading from '../../components/ui/Loading';
import { ItemInterface } from '../../Interfaces/ItemInterface';

const Items = () => {
  const { user } = useAppContext();
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);

  let t = page * offset;
  const { data, error, status } = useAllItems(limit, page * 8);

  const itemObjects =
    data &&
    data.data &&
    data.data.items &&
    !!data.data.items.length &&
    data.data.items;

  const itemCount = data && data.data && data.data.itemCount;

  useEffect(() => {
    const p = Math.round(itemCount / limit);
    setPages(p);
  }, [itemCount]);

  // const pages = Math.round(itemCount / limit);
  // console.log('pages: ', pages);

  const handleLoadMore = (inView: boolean) => {
    setPage(page + 1);
  };

  if (error) {
    return <p>error</p>;
  }

  if (!items) return <p>loading</p>;
  if (status === 'loading') return <Loading copy={'Loading Items'} />;

  const fetchMoreItems = limit < itemCount;

  const paginate = (e: any) => {
    setPage(e.target.value);
  };

  const renderPaginationElements = () => {
    let paginateButtons = [];
    for (let i = 0; i < pages; i++) {
      paginateButtons.push(
        <button key={i} value={i + 1} onClick={paginate}>
          {i + 1}
        </button>
      );
    }

    return paginateButtons;
  };

  return (
    <>
      <div className={gridStyles.cardGrid}>
        <div className={styles.wrapper}>
          {itemObjects.map((item: any) => {
            const isMyItem = user && user._id === item.userId;
            const isPublic = !item.isPrivate;
            if (isPublic || isMyItem) {
              return (
                <ItemCard
                  {...{
                    isMyItem,
                    item,
                  }}
                  key={item._id}
                />
              );
            }
          })}
        </div>
      </div>
      {renderPaginationElements()}
    </>
  );
};

export default Items;
