import React from 'react';
import Link from 'next/link';

import { API_URL } from '../constants/ApiEndpoint';

import styles from './NewCollectionCard.module.scss';
import { ItemInterface } from '../Interfaces/ItemInterface';
import loadUserById from '../auth/hooks/loadUserById';

interface Props {
  title: string;
  items: [];
  id: string;
  author: string;
  userId: string;
  tags: string[];
  handleSetSelectedItem: (item: ItemInterface) => void;
}
const NewCollectionCard = (props: Props) => {
  const { title, items, id, author, tags, handleSetSelectedItem, userId } =
    props;

  const authorObj = loadUserById(userId);
  const authorName = authorObj && authorObj[0] && authorObj[0].name;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Link href={`/collections/${id}`}>
            <h1>{title}</h1>
          </Link>

          <h3>
            Curated by{' '}
            <Link href={`/profile/${userId}`}>
              <span>{authorName}</span>
            </Link>
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
            items.map((item, i) => (
              <div
                key={i}
                className={styles.thumbnail}
                onClick={() => handleSetSelectedItem(item)}
              >
                <img src={`${API_URL}/items/images/${item.imageID}`} />
              </div>
            ))}
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default NewCollectionCard;