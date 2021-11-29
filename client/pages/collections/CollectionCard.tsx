import React from 'react';
import Link from 'next/link';

import { API_URL } from '../constants/ApiEndpoint';

import styles from './CollectionCard.module.scss';

interface Props {
  title: string;
  items: [];
  id: string;
}
const CollectionCard = (props: Props) => {
  const { title, items, id } = props;

  const firstImage = items && !!items.length && items[0].imageID;

  return (
    <Link href={`/collections/${id}`}>
      <div className={styles.wrapper}>
        {firstImage && <img src={`${API_URL}/items/images/${firstImage}`} />}
        <div className={styles.content}>
          <h1>{title}</h1>
          <h3>{items.length} Items</h3>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
