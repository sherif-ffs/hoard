import React, { useState, useEffect } from 'react';

import { useAppContext } from '../contexts/AppContext';
import loadAllCollections from '../hooks/collections/loadAllCollections';
import NewCollectionCard from './collections/NewCollectionCard';
import NothingFound from './ui/NothingFound';
import Pagination from './ui/Pagination';
import Loading from './ui/Loading';
import Error from './ui/Error';
import Navigation from './navigation/Navigation';

import styles from './collections/Collections.module.scss';

interface Props {
  filterList: string[];
}

const Collections = (props: Props) => {
  const { handleSetSelectedItem } = useAppContext();
  const [limit] = useState(150);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);

  const { filterList } = props;

  const response = loadAllCollections(limit, page * limit, filterList);
  const { collectionsData, status, error } = response;

  const itemCount = collectionsData && collectionsData.collectionsCount;
  const collections = collectionsData && collectionsData.collections;

  useEffect(() => {
    const p = Math.round(itemCount / limit);
    setPages(p);
  }, [itemCount]);

  const paginate = (e: any) => {
    setPage(e.target.value);
  };

  if (status === 'loading') {
    return <Loading copy={'Loading Collections...'} />;
  }

  return (
    <>
      <Navigation />
      <header className={styles.collectionsHeader}>
        <h1>Collections</h1>
      </header>
      <div className={styles.collections}>
        {!collections || (itemCount === 0 && <NothingFound />)}
        {error && <Error />}
        {collections &&
          !!collections.length &&
          collections.map((d: any) => {
            const hasItems = d.items && !!d.items.length;
            return (
              hasItems && (
                <NewCollectionCard
                  id={d._id}
                  title={d.title}
                  items={d.items}
                  tags={d.tags}
                  userId={d.userId}
                  author={d.author ? d.author : 'Sherif Elmetwally'}
                  key={d._id}
                  {...{ handleSetSelectedItem }}
                />
              )
            );
          })}
        <Pagination {...{ pages, page, paginate }} />
      </div>
    </>
  );
};

export default Collections;
