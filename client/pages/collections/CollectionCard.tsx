import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import styles from './CollectionCard.module.scss';

interface Props {
  title: string;
  items: ItemInterface[];
  id: string;
}
const CollectionCard = (props: Props) => {
  const { title, items, id } = props;

  const firstImage = items && items[0] && items[0].imageID;
  return (
    <Link href={`/collections/${id}`}>
      <article>
        {firstImage ? (
          <div className={styles.imgWrapper}>
            <img
              src={`${API_URL}/items/images/${firstImage}`}
              loading="lazy"
            ></img>
          </div>
        ) : null}
        <div className={styles.text}>
          <h3>{title}</h3>
          <span>{items && items.length} items</span>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;
