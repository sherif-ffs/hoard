import React from 'react';
import type { NextPage } from 'next';

import { Navigation } from '../navigation/components/Navigation';
import loadAllCollections from './hooks/loadAllCollections';
import CollectionCard from './CollectionCard';
import styles from './Collections.module.scss';
const Collections: NextPage = () => {
  const { data, status, error } = loadAllCollections();
  console.log('data: ', data);
  console.log('status: ', status);
  console.log('error: ', error);
  if (error) {
    return <p>error</p>;
  }

  return (
    <>
      <Navigation />
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
