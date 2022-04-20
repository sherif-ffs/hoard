import { useState, useEffect } from 'react';
import classNames from 'classnames';

import Navigation from '../navigation/Navigation';
import ItemCard from '../items/ItemCard';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import NothingFound from '../ui/NothingFound';
import { useAppContext } from '../../contexts/AppContext';
import Loading from '../ui/Loading';
import CollectionHeader from './CollectionHeader';
import loadCollectionByCollectionID from '../../hooks/collections/loadCollectionByCollectionID';
import Error from '../ui/Error';

import buttonStyles from '../../styles/button.module.scss';
import styles from './Collection.module.scss';

const Collection = () => {
  const [id, setId] = useState('');

  const { setCreateModalIsOpen } = useAppContext();

  const response = loadCollectionByCollectionID(id);
  const { collection, error, status } = response;

  useEffect(() => {
    const url = window.location.href;
    const id = url.toString().slice(-24);
    setId(id);
  }, []);

  if (status === 'loading') {
    return <Loading copy={'Loading Collection'} />;
  }

  const tags = collection && collection.tags;
  const itemsExist =
    collection && collection.items && !!collection.items.length;

  const authorId = collection && collection.userId;
  const title = collection && collection.title;
  const description = collection && collection.description;
  const collectionId = collection && collection._id;
  const count =
    collection &&
    collection.items &&
    !!collection.items.length &&
    collection.items.length;

  const oneItemView = count === 1;

  const collectionCards = collection && collection.items && collection.items;

  return (
    <>
      <Navigation />
      <CollectionHeader
        {...{ title, count, description, authorId, collectionId, tags }}
      />
      {error && <Error />}
      <div
        className={classNames(styles.wrapper, { [styles.one]: oneItemView })}
      >
        {itemsExist ? (
          [...collectionCards].reverse().map((item: ItemInterface) => {
            return <ItemCard {...{ item }} key={item._id} />;
          })
        ) : (
          <>
            <div className={styles.noItemsWrapper}>
              <NothingFound />
              <button
                onClick={setCreateModalIsOpen}
                className={buttonStyles.button}
              >
                Create Item
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Collection;
