import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { API_URL } from '../constants/ApiEndpoint';
import { shimmer, toBase64 } from '../utils';
import styles from './CollectionCard.module.scss';

interface Props {
  title: string;
  items: [];
  id: string;
}
const CollectionCard = (props: Props) => {
  const { title, items, id } = props;

  const firstImage = items && !!items.length && items[0].imageID;

  /**
   <Image
  src={`${API_URL}/items/images/${imageID}`}
  placeholder="blur"
  layout="fill"
  quality={100}
  blurDataURL={`data:image/svg+xml;base64,${toBase64(
    shimmer(200, 200)
  )}`}
/>
   */
  return (
    <Link href={`/collections/${id}`}>
      <div className={styles.wrapper}>
        {firstImage && (
          <div className={styles.imgWrapper}>
            <Image
              src={`${API_URL}/items/images/${firstImage}`}
              placeholder="blur"
              layout="fill"
              quality={100}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(200, 200)
              )}`}
            />
          </div>
        )}
        <div className={styles.content}>
          <h1>{title}</h1>
          <h3>{items.length} Items</h3>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
