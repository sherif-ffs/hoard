import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../../../contexts/AuthContext';
import useAllItems from '../../../hooks/useAllItems';
import ItemCard from './ItemCard';
import Pagination from '../../ui/Pagination';
import Loading from '../../ui/Loading';
import NothingFound from '../../ui/NothingFound';

import styles from './Items.module.scss';

interface Props {
  filterList: string[];
}
const Items = (props: Props) => {
  const { user } = useAuthContext();
  const [limit] = useState(25);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);

  const { data, error, status } = useAllItems(
    limit,
    page * limit,
    props.filterList
  );

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

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  if (status === 'loading') return <Loading copy={'Loading Items'} />;

  const paginate = (e: any) => {
    setPage(e.target.value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {!itemObjects && <NothingFound />}

        {itemObjects &&
          itemObjects.map((item: any) => {
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
      <Pagination {...{ pages, page, paginate }} />
    </>
  );
};

export default Items;
