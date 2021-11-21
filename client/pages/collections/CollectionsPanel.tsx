import { useAppContext } from '../components/AppWrapper';
import classNames from 'classnames';

import CloseSVG from '../components/ui/icons/CloseSVG';
import CollectionsPanelPill from './CollectionsPanelPill';

import styles from './CollectionsPanel.module.scss';

interface Props {
  isOpen: boolean;
  item: any;
  closeCollectionsPanel: () => void;
}
const CollectionsPanel = (props: Props) => {
  const { isOpen, closeCollectionsPanel, item } = props;
  const { myCollections } = useAppContext();

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
            return (
              <CollectionsPanelPill
                key={collection._id}
                {...{ item, collection, closeCollectionsPanel }}
              />
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
