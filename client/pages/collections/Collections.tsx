import React from 'react';
import type { NextPage } from 'next';
import { Navigation } from '../navigation/components/Navigation';
import { useAppContext } from '../components/AppWrapper';
import CollectionCard from './CollectionCard';
import NewCollectionCard from './NewCollectionCard';
import styles from './Collections.module.scss';

const Collections: NextPage = () => {
  const { allCollections } = useAppContext();

  if (allCollections === 'loading') {
    return <p>loading</p>;
  }

  return (
    <>
      <Navigation />
      <div className={styles.collections}>
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
                  author={d.author ? d.author : 'Sherif Elmetwally'}
                  key={d._id}
                />
              )
            );
          })}
      </div>
    </>
  );
};

export default Collections;
