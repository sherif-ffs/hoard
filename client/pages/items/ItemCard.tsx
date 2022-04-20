import React from 'react';

import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import { useAppContext } from '../../contexts/AppContext';

import styles from './ItemCard.module.scss';

type Props = {
  item: ItemInterface;
};

const Item = (props: Props) => {
  const name = props && props.item && props.item.name;
  const imageID = props && props.item && props.item.imageID;
  const tags = props && props.item && props.item.tags;

  const { handleSetSelectedItem } = useAppContext();

  const tagLength = tags && tags.length - 4;
  return (
    <article>
      {imageID ? (
        <div
          onClick={() => handleSetSelectedItem(props.item)}
          className={styles.imgWrapper}
        >
          <img src={`${API_URL}/items/images/${imageID}`} loading="lazy"></img>
        </div>
      ) : null}
      <div className={styles.text}>
        <h3 onClick={() => handleSetSelectedItem(props.item)}>{name}</h3>
        <div className={styles.tags}>
          {tags &&
            tags.slice(0, 4).map((tag, i) => {
              const lastIndex =
                tagLength && tagLength > 4 ? 4 : tags.length - 1;
              const isLast = i === lastIndex;
              return (
                <span key={i}>
                  {tag}
                  {!isLast ? ',' : null}
                </span>
              );
            })}
          {tagLength && tagLength > 4 && <span>{tagLength}+</span>}
        </div>
      </div>
    </article>
  );
};

export default Item;
