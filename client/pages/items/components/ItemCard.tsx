import React from 'react';
import classNames from 'classnames';

import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import { useItemContext } from '../../contexts/ItemsContext';
import styles from './ItemCard.module.scss';

type Props = {
  item: ItemInterface;
  isMyItem: boolean;
};

const Item = (props: Props) => {
  const { name, _id, imageID } = props.item;
  const { handleSetSelectedItem, handleSetItemToCollect } = useItemContext();

  return (
    <article>
      <div className={styles.wrapper}>
        {imageID ? (
          <div
            onClick={() => handleSetSelectedItem(props.item)}
            className={styles.imgWrapper}
          >
            <img
              src={`${API_URL}/items/images/${imageID}`}
              loading="lazy"
            ></img>
          </div>
        ) : null}
        <div className={classNames(styles.background, styles.one)}></div>
        <div className={classNames(styles.background, styles.two)}></div>
        <div className={classNames(styles.background, styles.three)}></div>
        <div className={classNames(styles.background, styles.four)}></div>
      </div>
      <div className={styles.text}>
        <h3 onClick={() => handleSetSelectedItem(props.item)}>{name}</h3>
      </div>
    </article>
  );
};

export default Item;
