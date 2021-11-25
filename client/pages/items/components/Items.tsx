import React, { useState } from 'react';

import { useAppContext } from '../../components/AppWrapper';
import useAllItems from '../../hooks/useAllItems';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import ItemCard from './ItemCard';
import ItemPanel from './ItemPanel';
import styles from './Items.module.scss';

const Items = () => {
  const { user } = useAppContext();
  const [limit, setLimit] = useState(8);
  const { data, error, status } = useAllItems(limit);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemPanelIsOpen, setItemPanelIsOpen] = useState(false);
  const itemsExist = data && data.data && !!data.data.length;

  const handleLoadMore = () => {
    let newLimit = limit;
    setLimit((newLimit += 8));
  };

  const handleSetSelectedItem = (item: ItemInterface) => {
    if (!itemPanelIsOpen) {
      setItemPanelIsOpen(true);
    }
    setSelectedItem(item);
  };

  const handleCloseItemPanel = () => setItemPanelIsOpen(false);

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
            return (
              <ItemCard
                {...{ isMyItem, item, handleSetSelectedItem }}
                key={item._id}
              />
            );
          }
        })}
      <button onClick={handleLoadMore}>Load More</button>
      {selectedItem && (
        <ItemPanel
          item={selectedItem}
          {...{ itemPanelIsOpen, handleCloseItemPanel }}
        />
      )}
    </div>
  );
};

export default Items;
