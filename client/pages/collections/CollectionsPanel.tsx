import { useAppContext } from '../components/AppWrapper';
import classNames from 'classnames';
import {
  addItemToCollection as add,
  removeItemFromCollection as remove,
} from './api/CollectionsApi';

import CheckSVG from '../components/ui/icons/CheckSVG';
import CloseSVG from '../components/ui/icons/CloseSVG';
import styles from './CollectionsPanel.module.scss';

interface Props {
  isOpen: boolean;
  item: any;
  closeCollectionsPanel: () => void;
}
const CollectionsPanel = (props: Props) => {
  const { isOpen, closeCollectionsPanel, item } = props;
  const { myCollections } = useAppContext();
  const toggle = (collectionId: string, includes: boolean) => {
    includes
      ? removeItemFromCollection(collectionId)
      : addItemToCollection(collectionId);
  };

  const addItemToCollection = async (collectionId: string) => {
    const res = await add(collectionId, item);
    const data = await res.json();
    console.log('data: ', data);
    const { status } = data;
    if (status === 'ok') {
      closeCollectionsPanel();
      return;
    } else {
      // handle error
    }
  };

  const removeItemFromCollection = async (collectionId: string) => {
    const res = await remove(item, collectionId);
    const data = await res.json();
    console.log('data: ', data);
    const { status } = data;
    if (status === 'ok') {
      closeCollectionsPanel();
      return;
    } else {
      alert('something went wrong');
      // handle error
    }
  };

  console.log('myCollections: ', myCollections);

  if (myCollections === 'loading') {
    return <p>loading</p>;
  }

  return (
    <div className={classNames(styles.panel, { [styles.open]: isOpen })}>
      <div className={styles.content}>
        <p className={styles.saveTo}>Save to:</p>
        {myCollections &&
          !!myCollections.length &&
          myCollections.map((collection: any) => {
            const itemId = item && item._id;
            const collectionItemIds =
              collection &&
              collection.items &&
              collection.items.map((c: any) => c._id);

            const includes =
              collectionItemIds && collectionItemIds.includes(itemId);
            return (
              <button
                className={classNames(styles.pill, {
                  [styles.selected]: includes,
                })}
                key={collection._id}
                onClick={() => toggle(collection._id, includes)}
              >
                {includes && (
                  <CheckSVG color="blue" height={'1.5em'} width={'1.5em'} />
                )}
                <span>{collection.title}</span>
              </button>
            );
          })}
        <button
          onClick={() => closeCollectionsPanel()}
          className={styles.close}
        >
          <CloseSVG color="#f5f5f5" height={24} width={24} />
        </button>
      </div>
    </div>
  );
};

export default CollectionsPanel;
