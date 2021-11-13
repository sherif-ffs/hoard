import React from 'react';
import type { NextPage } from 'next';

import { useAppContext } from '../../components/AppWrapper';
import Item from './Item';
import useAllItems from '../../hooks/useAllItems';
import styles from './Items.module.scss';

const Landing: NextPage = () => {
  const { user } = useAppContext();

  const { data, error, status } = useAllItems();

  const itemsExist = data && data.data && !!data.data.length;

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <div className={styles.wrapper}>
        {itemsExist &&
          data.data.map((item: any) => {
            const isMyItem = user && user._id === item.userId;
            const isPublic = !item.isPrivate;
            if (isPublic || isMyItem) {
              return <Item {...{ isMyItem, item }} key={item._id} />;
            }
          })}
      </div>
    </div>
  );
};

export default Landing;
