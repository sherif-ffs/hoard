import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
import Spinner from '../../components/ui/Spinner';
import styles from './Items.module.scss';

const Items = () => {
  const { user } = useAppContext();
  const [limit, setLimit] = useState(8);
  const { data, error, status } = useAllItems(limit);

  const items =
    data &&
    data.data &&
    data.data.items &&
    !!data.data.items.length &&
    data.data.items;

  console.log('items: ', items);
  const itemCount = data && data.data && data.data.itemCount;
  /**
   * call handleLoadMore when items scroller is in view
   * return number of all items
   */
  const handleLoadMore = (inView: boolean) => {
    if (inView) {
      let newLimit = limit;
      setLimit((newLimit += 8));
    }
  };

  if (error) {
    return <p>error</p>;
  }

  if (!items) return <p>loading</p>;

  const fetchMoreItems = limit < itemCount;

  return (
    <>
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
      </div>
      {fetchMoreItems && (
        <InView onChange={(inView) => handleLoadMore(inView)}>
          <div className={styles.spinnerWrapper}>
            <div>
              <Spinner />
              <span>Loading more items</span>
            </div>
          </div>
        </InView>
      )}
    </>
  );
};

export default Items;
