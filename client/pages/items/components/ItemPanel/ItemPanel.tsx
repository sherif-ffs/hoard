import classNames from 'classnames';

import CloseSVG from '../../../components/ui/icons/CloseSVG';
import Mask from '../../../components/ui/Mask';
import { useItemContext } from '../../../contexts/ItemsContext';
import PanelHeader from './PanelHeader';
import PanelImage from './PanelImage';
import MoreByUser from './MoreByUser';
import RelatedItems from './RelatedItems';
import styles from './ItemPanel.module.scss';
import { useEffect } from 'react';

const ItemDetailsSheet = () => {
  const { itemPanelIsOpen, handleCloseItemPanel, selectedItem } =
    useItemContext();

  if (!selectedItem) return null;
  useEffect(() => {
    return () => handleCloseItemPanel();
  }, []);

  const { imageID, name, url, userId, author, tags } =
    selectedItem && selectedItem;
  return (
    <Mask isOpen={itemPanelIsOpen}>
      <div
        className={classNames(styles.wrapper, {
          [styles.open]: itemPanelIsOpen,
        })}
      >
        <div className={styles.content}>
          <span className={styles.closeIcon} onClick={handleCloseItemPanel}>
            <CloseSVG height={30} width={30} color="#050505" />
          </span>
          <PanelHeader />
          <PanelImage {...{ imageID, url }} />
          <MoreByUser />
          <RelatedItems />
        </div>
      </div>
    </Mask>
  );
};

export default ItemDetailsSheet;
