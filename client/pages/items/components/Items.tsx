import React, { useState, useEffect } from 'react';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
import styles from './Items.module.scss';
import Pagination from '../../components/ui/Pagination';
import Loading from '../../components/ui/Loading';

interface Props {
  filterList: [];
}
const Items = (props: Props) => {
  const { user } = useAppContext();
  const [limit] = useState(10);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);
  // add filters here ?
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
    return <p>error</p>;
  }

  if (!itemObjects)
    return (
      <div className={styles.noItems}>
        <h1>No Items Found</h1>
      </div>
    );

  if (status === 'loading') return <Loading copy={'Loading Items'} />;

  const paginate = (e: any) => {
    setPage(e.target.value);
  };

  return (
    <>
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
      <Pagination {...{ pages, page, paginate }} />
    </>
  );
};

export default Items;
