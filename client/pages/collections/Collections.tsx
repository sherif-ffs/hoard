import React from 'react';

import { useAppContext } from '../components/AppWrapper';
import CollectionCard from './CollectionCard';

import styles from './Collections.module.scss';

const Collections = () => {
  const { allCollections } = useAppContext();

  if (allCollections === 'loading') {
    return <p>loading</p>;
  }

  return (
    <>
      <div className={styles.collections}>
        {allCollections &&
          allCollections.map((d: any) => {
            return (
              <CollectionCard title={d.title} items={d.items} key={d._id} />
            );
          })}
      </div>
    </>
  );
};

export default Collections;
