import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

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
      <article>
        <div className={styles.wrapper}>
          {firstImage ? (
            <div className={styles.imgWrapper}>
              <img
                src={`${API_URL}/items/images/${firstImage}`}
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
          <h3>{title}</h3>
          <span>{items.length} items</span>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;
