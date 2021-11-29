import React from 'react';
import Link from 'next/link';

import { API_URL } from '../constants/ApiEndpoint';

import styles from './NewCollectionCard.module.scss';
import { TagOptions } from '../constants/Tags';

interface Props {
  title: string;
  items: [];
  id: string;
  author: string;
  tags: string[];
}
const NewCollectionCard = (props: Props) => {
  const { title, items, id, author, tags } = props;

  return (
    <>
      <hr></hr>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Link href={`/collections/${id}`}>
            <h1>{title}</h1>
          </Link>
          <h3>
            Created by <span>{author}</span>
          </h3>
          <h4>
            <strong>{items.length}</strong> Items
          </h4>
          <ul>
            {tags.map((tag, i) => (
              <li key={tag}>
                {tag}
                {i !== tags.length - 1 ? ',' : null}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.thumbnails}>
          {items &&
            !!items.length &&
            items.map((item) => (
              <div className={styles.thumbnail}>
                <img src={`${API_URL}/items/images/${item.imageID}`} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default NewCollectionCard;
