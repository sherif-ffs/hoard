import classNames from 'classnames';

import { useAuthContext } from '../contexts/AuthContext';
import CloseSVG from '../ui/icons/CloseSVG';
import AddSVG from '../ui/icons/AddSVG';
import loadMyCollections from '../collections/hooks/loadCollectionById';
import { useAppContext } from '../contexts/AppContext';
import CollectionsPanelPill from './CollectionsPanelPill';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

import styles from './CollectionsPanel.module.scss';

const CollectionsPanel = () => {
  const { user } = useAuthContext();
  const {
    closeCollectionsPanel,
    collectionsPanelIsOpen,
    itemToCollect,
    openCreateCollectionModal,
  } = useAppContext();

  const id = user && user._id;
  const response = user && user._id && loadMyCollections(id);

  const myCollections = response && response.collections;
  const status = response && response.status;
  const error = response && response.error;

  if (status === 'loading') {
    return <Loading copy={'Loading collections...'} />;
  }

  return (
    <div
      className={classNames(styles.panel, {
        [styles.open]: collectionsPanelIsOpen,
      })}
    >
      {error && <Error />}
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
