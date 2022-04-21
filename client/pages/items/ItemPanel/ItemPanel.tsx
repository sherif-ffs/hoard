import { useEffect } from 'react';
import classNames from 'classnames';

import CloseSVG from '../../ui/icons/CloseSVG';
import Mask from '../../ui/Mask';
import { useAppContext } from '../../../contexts/AppContext';
import PanelHeader from './PanelHeader';
import PanelImage from './PanelImage';
import MoreByUser from './MoreByUser';
import RelatedItems from './RelatedItems';

import styles from './ItemPanel.module.scss';

const ItemDetailsSheet = () => {
  const { itemPanelIsOpen, handleCloseItemPanel, selectedItem } =
    useAppContext();

  if (!selectedItem) return null;
  useEffect(() => {
    return () => handleCloseItemPanel();
  }, []);

  const { imageID, url } = selectedItem && selectedItem;
  return (
    <Mask isOpen={itemPanelIsOpen} close={handleCloseItemPanel}>
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
