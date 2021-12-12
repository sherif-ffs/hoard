import { useState } from 'react';
import classNames from 'classnames';
import {
  addItemToCollection as add,
  removeItemFromCollection as remove,
} from './api/CollectionsApi';
import { useItemContext } from '../contexts/ItemsContext';
import loadItemStatus from './hooks/loadItemStatus';
import CheckSVG from '../components/ui/icons/CheckSVG';
import styles from './CollectionsPanel.module.scss';

interface Props {
  closeCollectionsPanel: () => void;
  item: any;
  collection: any;
}

const CollectionsPanelPill = (props: Props) => {
  const { closeCollectionsPanel, item, collection } = props;
  const [refetching, setRefetching] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { itemToCollect } = useItemContext();

  const itemId = itemToCollect && itemToCollect._id;
  const collectionId = collection && collection._id;

  let includes = loadItemStatus(itemId, collectionId, refetching);

  if (includes === 'loading') {
    return <p>loading</p>;
  }

  const toggle = (collectionId: string, includes: boolean) => {
    includes
      ? removeItemFromCollection(collectionId)
      : addItemToCollection(collectionId);
  };

  const addItemToCollection = async (collectionId: string) => {
    // setRefetching(true);
    setUpdating(true);
    const res = await add(collectionId, item);
    const data = await res.json();
    const { status } = data;
    if (status === 'ok') {
      includes = true;
      // setRefetching(false);
      // // setUpdating(false);
      // setTimeout(() => {
      //   setRefetching(false);
      // }, 400);
      setTimeout(() => {
        setUpdating(false);
        closeCollectionsPanel();
      }, 400);
      return;
    } else {
      // handle error
    }
  };

  const removeItemFromCollection = async (collectionId: string) => {
    // setRefetching(true);
    setUpdating(true);
    const res = await remove(item, collectionId);
    const data = await res.json();
    const { status } = data;
    if (status === 'ok') {
      includes = false;
      // setRefetching(false);
      // setTimeout(() => {
      //   setRefetching(false);
      // }, 400);
      // setUpdating(false);
      setTimeout(() => {
        setUpdating(false);
        closeCollectionsPanel();
      }, 400);
      return;
    } else {
      console.error('error');
      // handle error
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
      {includes && !updating && (
        <CheckSVG color="#2a84ff" height={24} width={24} />
      )}
      <span>{collection.title}</span>
    </button>
  );
};

export default CollectionsPanelPill;
