import React, { useState } from 'react';
import { Navigation } from './navigation/components/Navigation';
import Items from './items/components/Items';
import Collections from './collections';
import Filters from './discover/Filter';
const Discover = () => {
  const [view] = useState('items');
  const [filterList, setFilterList] = useState<string>([]);

  const updateFilters = (filters: Array<string>) => {
    setFilterList(filters);
  };

  return (
    <>
      <Navigation />
      <Filters {...{ updateFilters }} />
      {view === 'items' ? <Items {...{ filterList }} /> : <Collections />}
    </>
  );
};

export default Discover;
