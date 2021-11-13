import React from 'react';
import type { NextPage } from 'next';

import loadAllCollections from './hooks/loadAllCollections';
import CollectionCard from './CollectionCard';

import styles from './Collections.module.scss';

const Collections = () => {
  const { data, status, error } = loadAllCollections();

  if (error) {
    return <p>error</p>;
  }

  return (
    <>
      <section className={styles.collections}>
        {data &&
          data.data &&
          !!data.data.length &&
          data.data.map((d: any) => {
            return (
              <CollectionCard title={d.title} items={d.items} key={d._id} />
            );
          })}
      </section>
    </>
  );
};

export default Collections;
