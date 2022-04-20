import { useState } from 'react';
import classNames from 'classnames';
import toast from 'react-hot-toast';

import { useAppContext } from '../../contexts/AppContext';
import {
  addItemToCollection as add,
  removeItemFromCollection as remove,
} from '../../api/CollectionsApi';
import loadItemStatus from '../../hooks/collections/loadItemStatus';

import styles from './CollectionsPanel.module.scss';
import { useEffect } from 'react';

interface Props {
  closeCollectionsPanel: () => void;
  item: any;
  collection: any;
}

const CollectionsPanelPill = (props: Props) => {
  const { closeCollectionsPanel, item, collection } = props;
  const [updating, setUpdating] = useState(false);
  const [includes, setIncludes] = useState(false);

  const { itemToCollect } = useAppContext();

  const itemId = itemToCollect && itemToCollect._id;
  const collectionId = collection && collection._id;

  let res = loadItemStatus(itemId, collectionId, updating);

  useEffect(() => {
    if (res) {
      setIncludes(true);
    } else {
      setIncludes(false);
    }
  }, [res]);

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
      setIncludes(true);
      setUpdating(false);
      return toast.success('Saved to collection');
    } else {
      return toast.error('something went wrong');
    }
  };

  const removeItemFromCollection = async (collectionId: string) => {
    setUpdating(true);
    const res = await remove(item, collectionId);
    const data = await res.json();

    const { status } = data;
    if (status === 'ok') {
      setIncludes(false);
      setUpdating(false);
      return toast.success('Removed from collection');
    } else {
      return toast.error('something went wrong');
    }
  };

  return (
    <button
      className={classNames(styles.pill, {
        [styles.selected]: includes,
      })}
      key={collection && collection._id}
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
      <span>{collection && collection.title}</span>
      {includes && <span style={{ marginLeft: '5px' }}>&#10003;</span>}
    </button>
  );
};

export default CollectionsPanelPill;
