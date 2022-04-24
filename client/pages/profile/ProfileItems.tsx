import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import loadItemsByUserID from '../../hooks/items/loadItemsByUser';
import ItemCard from '../items/ItemCard';
import NothingFound from '../ui/NothingFound';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

import gridStyles from '../../styles/_cardGrid.module.scss';

interface Props {
  id: string;
}

const ProfileItems = (props: Props) => {
  const { id } = props;
  const [page, setPage] = useState(0);
  const [itemsToRender, setItemsToRender] = useState<any>([]);
  const { ref, inView } = useInView({
    rootMargin: '200px 0px',
  });

  const response = loadItemsByUserID(id, 25, page * 25);
  const { data, status, error } = response;

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

  const paginate = (p: number) => {
    setPage(p);
  };

  useEffect(() => {
    if (inView) {
      paginate(page + 1);
    }
  }, [inView]);

  if (status === 'loading') {
    return <Loading copy="Loading items..." />;
  }

  if (error) {
    return <Error />;
  }

  const itemsExist = itemsToRender && !!itemsToRender.length;
  const oneItemView = itemsToRender && itemsToRender.length === 1;
  const itemCount = data && data.data && data.data.itemCount;

  if (itemsExist) {
    return (
      <>
        <div
          className={classNames(gridStyles.cardGrid, {
            [gridStyles.oneItem]: oneItemView,
          })}
        >
          {itemsToRender.map((item: any) => {
            const isPublic = !item.isPrivate;
            if (isPublic) {
              return (
                <ItemCard
                  {...{
                    item,
                  }}
                  hideText={false}
                  key={item._id}
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
  } else {
    return <NothingFound />;
  }
};

export default ProfileItems;
