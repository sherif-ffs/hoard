import React from 'react';
import Image from 'next/image';

import { deleteItem } from '../api/ItemApi';
import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import { useItemContext } from '../../contexts/ItemsContext';
import SaveSVG from '../../components/ui/icons/SaveSVG';
import { shimmer, toBase64 } from '../../utils';
import styles from './ItemCard.module.scss';

type Props = {
  item: ItemInterface;
  isMyItem: boolean;
};

const Item = (props: Props) => {
  const { name, _id, imageID } = props.item;
  const { handleSetSelectedItem, handleSetItemToCollect } = useItemContext();

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
        <div
          onClick={() => handleSetSelectedItem(props.item)}
          className={styles.imgWrapper}
        >
          <img src={`${API_URL}/items/images/${imageID}`} loading="lazy"></img>
          {/* <Image
            src={`${API_URL}/items/images/${imageID}`}
            placeholder="blur"
            layout="fill"
            quality={100}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(200, 200)
            )}`}
          /> */}
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.actions}>
          <h1 onClick={() => handleSetSelectedItem(props.item)}>{name}</h1>
          <button
            onClick={() => handleSetItemToCollect(props.item)}
            className={styles.saveButton}
          >
            <SaveSVG height={27} width={27} color="#050505" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
