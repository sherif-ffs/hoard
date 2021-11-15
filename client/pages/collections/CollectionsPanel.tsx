import { useAppContext } from '../components/AppWrapper';
import classNames from 'classnames';
import styles from './CollectionsPanel.module.scss';

interface Props {
  isOpen: boolean;
  item: any;
  closeCollectionsPanel: () => void;
}
const CollectionsPanel = (props: Props) => {
  const { isOpen, closeCollectionsPanel, item } = props;
  const { collections } = useAppContext();

  console.log('collections: ', collections);
  console.log('item: ', item);
  return (
    <div className={classNames(styles.panel, { [styles.open]: isOpen })}>
      <div className={styles.content}>
        <p>Save to:</p>
        {collections.map((collection: any) => (
          <button key={collection._id}>{collection.title}</button>
        ))}
      </div>
      <button onClick={() => closeCollectionsPanel()}>close</button>
    </div>
  );
};

export default CollectionsPanel;
