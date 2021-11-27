import React, { useState } from 'react';
import classNames from 'classnames';

import { Navigation } from '../navigation/components/Navigation';
import Items from '../items/components/Items';
import Collections from '../collections/Collections';
import CreateModal from '../items/components/CreateModal';
import ItemPanel from '../items/components/ItemPanel/ItemPanel';
import CollectionsPanel from '../collections/CollectionsPanel';
import CreateCollectionModal from '../collections/CreateCollectionModal';
import { useItemContext } from '../contexts/ItemsContext';
import styles from './Discover.module.scss';

const Discover = () => {
  const [view, setView] = useState('items');
  const {
    itemPanelIsOpen,
    selectedItem,
    collectionsPanelIsOpen,
    itemToCollect,
  } = useItemContext();

  const isItems = view === 'items';

  return (
    <>
      <Navigation />
      <CreateModal />
      <div className={styles.tabs}>
        <button
          onClick={() => setView('items')}
          className={classNames(styles.tab, { [styles.active]: isItems })}
        >
          Items
        </button>
        <button
          onClick={() => setView('collections')}
          className={classNames(styles.tab, { [styles.active]: !isItems })}
        >
          Collections
        </button>
      </div>

      {view === 'items' ? <Items /> : <Collections />}
      {selectedItem && <ItemPanel />}
      <CollectionsPanel isOpen={collectionsPanelIsOpen} item={itemToCollect} />
      <CreateCollectionModal />
    </>
  );
};

export default Discover;
