import { useState, useEffect } from 'react';

import { Navigation } from '../navigation/components/Navigation';
import { useAppContext } from '../components/AppWrapper';
import ItemCard from '../items/components/ItemCard';
import loadCollectionByCollectionID from './hooks/loadCollectionByCollectionID';
import CollectionsPanel from './CollectionsPanel';
import CreateCollectionModal from './CreateCollectionModal';
import ItemPanel from '../items/components/ItemPanel/ItemPanel';
import CreateModal from '../items/components/CreateModal';
import CollectionHeader from './CollectionHeader';
import styles from './Collection.module.scss';

const Collection = () => {
  const [id, setId] = useState('');
  const [collection, setCollection] = useState(null);

  const targetCollection = loadCollectionByCollectionID(id);
  const { setCreateModalIsOpen } = useAppContext();

  if (collection === 'loading') {
    return <p>loading</p>;
  }

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

  const itemsExist =
    collection && collection.items && !!collection.items.length;

  console.log('collection: ', collection);
  const authorId = collection && collection.userId;
  const title = collection && collection.title;
  const description = collection && collection.description;
  const count =
    collection &&
    collection.items &&
    !!collection.items.length &&
    collection.items.length;
  return (
    <>
      <Navigation />
      <CollectionHeader {...{ title, count, description, authorId }} />
      <div className={styles.wrapper}>
        {itemsExist ? (
          collection.items.map((item) => {
            return <ItemCard {...{ item }} key={item._id} />;
          })
        ) : (
          <div className={styles.noItems}>
            <h1>No Items In Collection</h1>
            <button onClick={setCreateModalIsOpen}>Create Item</button>
          </div>
        )}
      </div>
      <ItemPanel />
      <CollectionsPanel />
      <CreateCollectionModal />
      <CreateModal />
    </>
  );
};

export default Collection;
