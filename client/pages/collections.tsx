import React from 'react';
import type { NextPage } from 'next';

import { Navigation } from './navigation/components/Navigation';
import { useItemContext } from './contexts/ItemsContext';
import loadAllCollections from './collections/hooks/loadAllCollections';
import NewCollectionCard from './collections/NewCollectionCard';

import styles from './collections/Collections.module.scss';

const Collections: NextPage = () => {
  const allCollections = loadAllCollections();
  console.log('allCollections: ', allCollections);
  const { handleSetSelectedItem } = useItemContext();

  if (allCollections === 'loading') {
    return <p>loading</p>;
  }

  return (
    <>
      <Navigation />
      <div className={styles.collections}>
        <header>
          <h1>User Generated Collections</h1>
        </header>
        {allCollections &&
          allCollections.map((d: any) => {
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
      </div>
    </>
  );
};

export default Collections;
