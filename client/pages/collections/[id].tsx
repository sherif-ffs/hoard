/*
 * fetch collection by id
 */
import { useState, useEffect } from 'react';
import loadCollectionByCollectionID from './hooks/loadCollectionByCollectionID';
import { Navigation } from '../navigation/components/Navigation';
import ItemCard from '../items/components/ItemCard';
import CollectionsPanel from './CollectionsPanel';
import CreateCollectionModal from './CreateCollectionModal';
import ItemPanel from '../items/components/ItemPanel/ItemPanel';
import styles from './Collection.module.scss';

const Collection = () => {
  const [id, setId] = useState('');
  const [collection, setCollection] = useState(null);
  const targetCollection = loadCollectionByCollectionID(id);

  useEffect(() => {
    if (targetCollection) {
      console.log(targetCollection);
      setCollection(targetCollection[0]);
    }
  }, [targetCollection]);

  useEffect(() => {
    const url = window.location.href;
    const id = url.toString().slice(-24);
    setId(id);
  }, []);

  return (
    <>
      <Navigation />
      <h1>{collection && collection.title}</h1>
      <div className={styles.wrapper}>
        {collection &&
          collection.items &&
          collection.items.map((item) => {
            return <ItemCard {...{ item }} key={item._id} />;
          })}
      </div>
      <ItemPanel />
      <CollectionsPanel />
      <CreateCollectionModal />
    </>
  );
};

export default Collection;
