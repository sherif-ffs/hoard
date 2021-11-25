import React, { useState } from 'react';
import { deleteItem } from '../api/ItemApi';
import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import CollectionsPanel from '../../collections/CollectionsPanel';
import SaveSVG from '../../components/ui/icons/SaveSVG';
import styles from './ItemCard.module.scss';

type Props = {
  item: ItemInterface;
  isMyItem: boolean;
  openCollectionsPanel: () => void;
  handleSetSelectedItem: () => void;
};

const Item = (props: Props) => {
  const {
    author,
    name,
    _id,
    isPrivate,
    likes,
    tags,
    url,
    collections,
    imageID,
    userId,
  } = props.item;

  const [collectionsPanelIsOpen, setCollectionsPanelIsOpen] = useState(false);

  const closeCollectionsPanel = () => {
    setCollectionsPanelIsOpen(false);
  };

  const handleDeleteItem = async () => {
    const res = await deleteItem(_id);
    const response = await res.json();
    const { status, data } = response;
    if (status === 'ok') {
      alert('Item deleted successfully');
      return;
    }
    alert(data);
  };
  return (
    <div className={styles.wrapper}>
      {imageID ? (
        <img src={`${API_URL}/items/images/${imageID}`} loading="lazy"></img>
      ) : null}
      <div className={styles.content}>
        <div className={styles.actions}>
          <h1 onClick={() => props.handleSetSelectedItem(props.item)}>
            {name}
          </h1>
          <button
            onClick={() => setCollectionsPanelIsOpen(true)}
            className={styles.saveButton}
          >
            <SaveSVG height={27} width={27} color="#050505" />
          </button>
        </div>
        {/* <div className={styles.tags}>
          {tags &&
            !!tags.length &&
            tags.map((tag, idx) => (
              <li key={idx} className={styles.tag}>
                {tag}
              </li>
            ))}
        </div> */}
      </div>
      <CollectionsPanel
        isOpen={collectionsPanelIsOpen}
        item={props.item}
        {...{ closeCollectionsPanel }}
      />
    </div>
  );
};

export default Item;
