import React, { useState } from 'react';

import { useAppContext } from './contexts/AppContext';
import { Navigation } from './navigation/components/Navigation';
import Items from './items/components/Items';
import Collections from './collections';
import Filters from './discover/Filter';

import styles from './collections/Collections.module.scss';

const Discover = () => {
  const [view] = useState('collections');
  const [filterList, setFilterList] = useState<string[]>([]);
  const { discoverView } = useAppContext();

  const updateFilters = (filters: Array<string>) => {
    setFilterList(filters);
  };

  return (
    <>
      <Navigation />
      {discoverView === 'collections' && (
        <header className={styles.collectionsHeader}>
          <h1>User Generated Collections</h1>
        </header>
      )}
      <Filters {...{ updateFilters }} />
      {discoverView === 'items' ? (
        <Items {...{ filterList }} />
      ) : (
        <Collections {...{ filterList }} />
      )}
    </>
  );
};

export default Discover;
