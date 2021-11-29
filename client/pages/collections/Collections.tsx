import React from 'react';
import type { NextPage } from 'next';
import { Navigation } from '../navigation/components/Navigation';
import { useAppContext } from '../components/AppWrapper';
import { useItemContext } from '../contexts/ItemsContext';
import CollectionsPanel from './CollectionsPanel';
import NewCollectionCard from './NewCollectionCard';
import ItemPanel from '../items/components/ItemPanel/ItemPanel';
import styles from './Collections.module.scss';

const Collections: NextPage = () => {
  const { allCollections } = useAppContext();
  const { handleSetSelectedItem, handleSetItemToCollect } = useItemContext();

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
                  author={d.author ? d.author : 'Sherif Elmetwally'}
                  key={d._id}
                  {...{ handleSetSelectedItem }}
                />
              )
            );
          })}
      </div>
      <ItemPanel />
      <CollectionsPanel />
    </>
  );
};

export default Collections;
