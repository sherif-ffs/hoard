import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
// import Spinner from '../../components/ui/Spinner';
import styles from './Items.module.scss';

import Loading from '../../components/ui/Loading';

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

  const itemCount = data && data.data && data.data.itemCount;

  const handleLoadMore = (inView: boolean) => {
    if (inView) {
      let newLimit = limit;
      setTimeout(() => {
        setLimit((newLimit += 8));
      }, 1000);
    }
  };

  if (error) {
    return <p>error</p>;
  }

  if (status === 'loading') return <Loading copy={'Loading Items'} />;

  const fetchMoreItems = limit < itemCount;

  console.log('items; ', items);
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
      {fetchMoreItems && items && (
        <InView onChange={(inView) => handleLoadMore(inView)}>
          <Loading copy={'Loading More Items'} />
        </InView>
      )}
    </>
  );
};

export default Items;
