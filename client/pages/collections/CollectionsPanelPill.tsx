import { useAppContext } from '../components/AppWrapper';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  addItemToCollection as add,
  removeItemFromCollection as remove,
} from './api/CollectionsApi';

import CheckSVG from '../components/ui/icons/CheckSVG';
import CloseSVG from '../components/ui/icons/CloseSVG';
import styles from './CollectionsPanel.module.scss';

interface Props {
  closeCollectionsPanel: () => void;
  item: any;
  collection: any;
}

const CollectionsPanelPill = (props: Props) => {
  const { closeCollectionsPanel, item, collection } = props;
  const [includes, setIncludes] = useState(false);

  useEffect(() => {
    const itemId = item && item._id;
    const collectionItemIds =
      collection && collection.items && collection.items.map((c: any) => c._id);

    const includes = collectionItemIds && collectionItemIds.includes(itemId);

    setIncludes(includes);
  }, [item, collection]);

  const toggle = (collectionId: string, includes: boolean) => {
    includes
      ? removeItemFromCollection(collectionId)
      : addItemToCollection(collectionId);
  };

  const addItemToCollection = async (collectionId: string) => {
    const res = await add(collectionId, item);
    const data = await res.json();
    const { status } = data;
    if (status === 'ok') {
      setIncludes(true);
      setTimeout(() => {
        closeCollectionsPanel();
      }, 400);
      return;
    } else {
      // handle error
    }
  };

  const removeItemFromCollection = async (collectionId: string) => {
    const res = await remove(item, collectionId);
    const data = await res.json();
    const { status } = data;
    if (status === 'ok') {
      setIncludes(false);
      setTimeout(() => {
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
      {includes && <CheckSVG color="#2a84ff" height={24} width={24} />}
      <span>{collection.title}</span>
    </button>
  );
};

export default CollectionsPanelPill;
