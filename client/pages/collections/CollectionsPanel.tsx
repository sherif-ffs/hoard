import { useAppContext } from '../components/AppWrapper';
import classNames from 'classnames';
import styles from './CollectionsPanel.module.scss';
import { addItemToCollection as add } from './api/CollectionsApi';

interface Props {
  isOpen: boolean;
  item: any;
  closeCollectionsPanel: () => void;
}
const CollectionsPanel = (props: Props) => {
  const { isOpen, closeCollectionsPanel, item } = props;
  const { collections } = useAppContext();

  const addItemToCollection = (collectionId: string) => {
    add(collectionId, item);
    // get item
    // post item to collection
  };

  // console.log('collections: ', collections);
  // console.log('item: ', item);
  return (
    <div className={classNames(styles.panel, { [styles.open]: isOpen })}>
      <div className={styles.content}>
        <p>Save to:</p>
        {collections.map((collection: any) => {
          // console.log('collection: ', collection);
          // const includes = collection.items.includes(item);
          const itemId = item && item._id;
          const collectionItemIds =
            collection &&
            collection.items &&
            collection.items.map((c: any) => c._id);

          const includes = collectionItemIds.includes(itemId);
          console.log('includes: ', includes);
          console.log('item: ', item);
          return (
            <button
              key={collection._id}
              onClick={() => addItemToCollection(collection._id)}
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
