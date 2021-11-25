import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import { ItemInterface } from '../../../Interfaces/ItemInterface';
import { API_URL } from '../../../constants/ApiEndpoint';
import SaveSVG from '../../../components/ui/icons/SaveSVG';
import CloseSVG from '../../../components/ui/icons/CloseSVG';
import CollectionsPanel from '../../../collections/CollectionsPanel';
import Mask from '../../../components/ui/Mask';

import PanelHeader from './PanelHeader';
import PanelImage from './PanelImage';
import MoreByUser from './MoreByUser';
import styles from './ItemPanel.module.scss';

interface Props {
  item: ItemInterface;
  itemPanelIsOpen: boolean;
  handleCloseItemPanel: () => void;
  handleSetSelectedItem: () => void;
}
const ItemDetailsSheet = (props: Props) => {
  const { item, itemPanelIsOpen, handleCloseItemPanel, handleSetSelectedItem } =
    props;
  console.log('item: ', item);

  const [collectionsPanelIsOpen, setCollectionsPanelIsOpen] = useState(false);

  const openCollectionsPanel = () => {
    setCollectionsPanelIsOpen(true);
  };
  const closeCollectionsPanel = () => {
    setCollectionsPanelIsOpen(false);
  };

  const { imageID, name, url, userId, author, tags } = item && item;
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
          <PanelHeader
            {...{ name, url, author, userId, openCollectionsPanel, tags }}
          />
          <PanelImage {...{ imageID, url }} />
          <MoreByUser
            {...{ item, handleCloseItemPanel, handleSetSelectedItem }}
          />
        </div>
        {/* <CollectionsPanel
          isOpen={collectionsPanelIsOpen}
          item={props.item}
          {...{ closeCollectionsPanel }}
        /> */}
      </div>
    </Mask>
  );
};

export default ItemDetailsSheet;
