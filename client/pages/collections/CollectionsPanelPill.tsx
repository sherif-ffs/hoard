import { useState } from 'react';
import classNames from 'classnames';

import { useAppContext } from '../contexts/AppContext';
import {
  addItemToCollection as add,
  removeItemFromCollection as remove,
} from './api/CollectionsApi';
import loadItemStatus from './hooks/loadItemStatus';

import styles from './CollectionsPanel.module.scss';

interface Props {
  closeCollectionsPanel: () => void;
  item: any;
  collection: any;
}

const CollectionsPanelPill = (props: Props) => {
  const { closeCollectionsPanel, item, collection } = props;
  const [updating, setUpdating] = useState(false);

  const { itemToCollect } = useAppContext();

  const itemId = itemToCollect && itemToCollect._id;
  const collectionId = collection && collection._id;

  let includes = loadItemStatus(itemId, collectionId, updating);

  if (includes === 'loading') {
    return <p>loading</p>;
  }

  const toggle = (collectionId: string, includes: boolean) => {
    includes
      ? removeItemFromCollection(collectionId)
      : addItemToCollection(collectionId);
  };

  const addItemToCollection = async (collectionId: string) => {
    setUpdating(true);
    const res = await add(collectionId, item);
    const data = await res.json();
    const { status } = data;
    if (status === 'ok') {
      includes = true;
      setTimeout(() => {
        setUpdating(false);
        setTimeout(() => {
          closeCollectionsPanel();
        }, 400);
      }, 800);
      return;
    } else {
      alert('something went wrong :(');
    }
  };

  const removeItemFromCollection = async (collectionId: string) => {
    setUpdating(true);
    const res = await remove(item, collectionId);
    const data = await res.json();
    console.log('data: ', data);
    const { status } = data;
    if (status === 'ok') {
      includes = false;
      setTimeout(() => {
        setUpdating(false);
        setTimeout(() => {
          closeCollectionsPanel();
        }, 400);
      }, 800);
      return;
    } else {
      alert('something went wrong :(');
    }
  };

  return (
    <button
      className={classNames(styles.pill, {
        [styles.selected]: includes,
      })}
      key={collection._id}
      onClick={() => toggle(collection._id, includes)}
    >
      {updating && (
        <span className={styles.updating}>
          <span />
          <span />
          <span />
        </span>
      )}
      {includes && <span style={{ marginRight: '5px' }}>&#10003;</span>}
      <span>{collection.title}</span>
      {includes && <span style={{ marginLeft: '5px' }}>&#10003;</span>}
    </button>
  );
};

export default CollectionsPanelPill;
