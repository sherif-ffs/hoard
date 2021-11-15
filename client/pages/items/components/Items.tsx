import React, { useState } from 'react';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import ItemCard from './ItemCard';
import CollectionsPanel from '../../collections/CollectionsPanel';
import styles from './Items.module.scss';

const Items = () => {
  const { user } = useAppContext();
  const [collectionsPanelIsOpen, setCollectionsPanelIsOpen] = useState(false);
  const { data, error, status } = useAllItems();

  const itemsExist = data && data.data && !!data.data.length;

  if (error) {
    return <p>error</p>;
  }

  return (
    <div className={styles.wrapper}>
      {itemsExist &&
        data.data.map((item: any) => {
          const isMyItem = user && user._id === item.userId;
          const isPublic = !item.isPrivate;
          if (isPublic || isMyItem) {
            return <ItemCard {...{ isMyItem, item }} key={item._id} />;
          }
        })}
      <CollectionsPanel
        isOpen={collectionsPanelIsOpen}
        // {...{ closeCollectionsPanel }}
      />
    </div>
  );
};

export default Items;
