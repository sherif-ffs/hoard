import React, { useState, useEffect } from 'react';

import { useAppContext } from './contexts/AppContext';
import loadAllCollections from './collections/hooks/loadAllCollections';
import NewCollectionCard from './collections/NewCollectionCard';
import NothingFound from './ui/NothingFound';
import Pagination from './ui/Pagination';

import styles from './collections/Collections.module.scss';

interface Props {
  filterList: string[];
}

const Collections = (props: Props) => {
  const { handleSetSelectedItem } = useAppContext();
  const [limit] = useState(15);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(0);

  const { filterList } = props;
  const allCollections = loadAllCollections(limit, page * limit, filterList);

  const { data, status } = allCollections;
  if (status === 'loading') {
    return <p>loading</p>;
  }

  const itemCount = data && data.collectionsCount;

  useEffect(() => {
    const p = Math.round(itemCount / limit);
    setPages(p);
  }, [itemCount]);

  const paginate = (e: any) => {
    setPage(e.target.value);
  };

  return (
    <>
      <div className={styles.collections}>
        {data && !data.collections && <NothingFound />}
        {data &&
          !!data.collections &&
          data.collections.map((d: any) => {
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
