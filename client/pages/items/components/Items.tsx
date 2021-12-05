import React, { useState } from 'react';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
import styles from './Items.module.scss';

const Items = () => {
  const { user } = useAppContext();
  const [limit, setLimit] = useState(8);
  const { data, error, status } = useAllItems(limit);
  console.log('data: ', data);
  const items =
    data &&
    data.data &&
    data.data.items &&
    !!data.data.items.length &&
    data.data.items;

  const itemCount = data && data.data && data.data.itemCount;
  /**
   * call handleLoadMore when items scroller is in view
   * return number of all items
   */
  const handleLoadMore = () => {
    let newLimit = limit;
    setLimit((newLimit += 8));
  };

  if (error) {
    return <p>error</p>;
  }

  if (!items) return <p>loading</p>;

  return (
    <div className={styles.wrapper}>
      {items.map((item: any) => {
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
      {limit < itemCount && <button onClick={handleLoadMore}>Load More</button>}
    </div>
  );
};

export default Items;
