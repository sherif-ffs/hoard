import React, { useState } from 'react';

import { useAppContext } from '../contexts/AppContext';
import Navigation from './navigation/Navigation';
import Items from './items/Items';
import Filters from './discover/Filter';
import Footer from './ui/Footer';

const Discover = () => {
  const [filterList, setFilterList] = useState<string[]>([]);
  const { discoverView } = useAppContext();

  const updateFilters = (filters: Array<string>) => {
    setFilterList(filters);
  };

  return (
    <>
      <Navigation />
      <Filters {...{ updateFilters }} />
      <Items {...{ filterList }} />
      <Footer />
    </>
  );
};

export default Discover;
