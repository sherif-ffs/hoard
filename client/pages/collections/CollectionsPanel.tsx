import { useAppContext } from '../components/AppWrapper';
import classNames from 'classnames';
import styles from './CollectionsPanel.module.scss';
import {
  addItemToCollection as add,
  removeItemFromCollection as remove,
} from './api/CollectionsApi';

interface Props {
  isOpen: boolean;
  item: any;
  closeCollectionsPanel: () => void;
}
const CollectionsPanel = (props: Props) => {
  const { isOpen, closeCollectionsPanel, item } = props;
  const { collections } = useAppContext();

  const toggle = (collectionId: string, includes: boolean) => {
    console.log('includes: ', includes);
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
      // were good
      return;
    } else {
      // handle error
    }
  };

  const removeItemFromCollection = async (collectionId: string) => {
    const res = await remove(item._id, collectionId);
    const data = await res.json();
    console.log('data: ', data);
    const { status } = data;
    if (status === 'ok') {
      // were good
      return;
    } else {
      alert('something went wrong');
      // handle error
    }
  };
  // console.log('collections: ', collections);
  // console.log('item: ', item);
  return (
    <div className={classNames(styles.panel, { [styles.open]: isOpen })}>
      <div className={styles.content}>
        <p>Save to:</p>
        {collections.map((collection: any) => {
          const itemId = item && item._id;
          const collectionItemIds =
            collection &&
            collection.items &&
            collection.items.map((c: any) => c._id);

          const includes =
            collectionItemIds && collectionItemIds.includes(itemId);
          return (
            <button
              key={collection._id}
              onClick={() => toggle(collection._id, includes)}
            >
              {includes && <h1>asdasda</h1>}
              {collection.title}
            </button>
          );
        })}
      </div>
      <button onClick={() => closeCollectionsPanel()}>close</button>
    </div>
  );
};

export default CollectionsPanel;
