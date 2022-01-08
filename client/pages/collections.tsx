import React from 'react';
import type { NextPage } from 'next';
import { useState } from 'react';

import { Navigation } from './navigation/components/Navigation';
import { useAppContext } from './contexts/AppContext';
import loadAllCollections from './collections/hooks/loadAllCollections';
import NewCollectionCard from './collections/NewCollectionCard';
import NothingFound from './ui/NothingFound';
import styles from './collections/Collections.module.scss';

interface Props {
  filterList: [];
}

const Collections = (props: Props) => {
  const { handleSetSelectedItem } = useAppContext();

  const { filterList } = props;
  const allCollections = loadAllCollections(filterList);

  if (allCollections === 'loading') {
    return <p>loading</p>;
  }

  const noCollections = allCollections && allCollections.length === 0;
  console.log('noCollections: ', noCollections);
  console.log('allCollections: ', allCollections);

  return (
    <>
      <div className={styles.collections}>
        {!allCollections && <NothingFound />}
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
