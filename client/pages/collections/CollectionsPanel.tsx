import { useAppContext } from '../components/AppWrapper';
import classNames from 'classnames';

import CloseSVG from '../components/ui/icons/CloseSVG';
import AddSVG from '../components/ui/icons/AddSVG';
import CollectionsPanelPill from './CollectionsPanelPill';
import { useItemContext } from '../contexts/ItemsContext';
import styles from './CollectionsPanel.module.scss';

const CollectionsPanel = () => {
  const { myCollections } = useAppContext();
  const {
    closeCollectionsPanel,
    collectionsPanelIsOpen,
    itemToCollect,
    openCreateCollectionModal,
  } = useItemContext();
  if (myCollections === 'loading') {
    return <p>loading</p>;
  }

  return (
    <div
      className={classNames(styles.panel, {
        [styles.open]: collectionsPanelIsOpen,
      })}
    >
      <div className={styles.content}>
        <p className={styles.saveTo}>Save to:</p>
        {myCollections &&
          !!myCollections.length &&
          myCollections.map((collection: any) => {
            return (
              <CollectionsPanelPill
                key={collection._id}
                item={itemToCollect}
                {...{ collection, closeCollectionsPanel }}
              />
            );
          })}
        <button
          className={styles.newCollection}
          onClick={() => openCreateCollectionModal()}
        >
          <AddSVG color="#363634" height={14} width={14} />
          <span>New Collection</span>
        </button>
        <button
          onClick={() => closeCollectionsPanel()}
          className={styles.close}
        >
          <CloseSVG color="#151515" height={24} width={24} />
        </button>
      </div>
    </div>
  );
};

export default CollectionsPanel;
