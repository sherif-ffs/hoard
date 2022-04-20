import React, { useState, useEffect } from 'react';
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
  const [page, setPage] = useState(0);
  const [itemsToRender, setItemsToRender] = useState<any>([]);
  const { ref, inView } = useInView();

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

  useEffect(() => {
    if (itemObjects) {
      if (props.filterList && !!props.filterList.length) {
        setItemsToRender(itemObjects);
        return;
      }
      const d = [...itemsToRender, ...itemObjects];
      setItemsToRender(d);
    }
  }, [itemObjects, props.filterList]);

  const itemCount = data && data.data && data.data.itemCount;

  useEffect(() => {
    if (inView) {
      paginate(page + 1);
    }
  }, [inView]);

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  if (status === 'loading') return <Loading copy={'Loading Items'} />;

  const paginate = (p: number) => {
    setPage(p);
  };
  // const paginate = (e: any) => {
  //   setPage(e.target.value);
  // };

  return (
    <>
      <div className={styles.wrapper}>
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
          }}
        >
          You've seen it all jack!
        </h3>
      )}

      {/* <Pagination {...{ pages, page, paginate }} /> */}
    </>
  );
};

export default Items;
