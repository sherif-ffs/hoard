import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { API_URL } from '../constants/ApiEndpoint';
import { shimmer, toBase64 } from '../utils';

import styles from './NewCollectionCard.module.scss';
import { TagOptions } from '../constants/Tags';
import { ItemInterface } from '../Interfaces/ItemInterface';

interface Props {
  title: string;
  items: [];
  id: string;
  author: string;
  tags: string[];
  handleSetSelectedItem: (item: ItemInterface) => void;
}
const NewCollectionCard = (props: Props) => {
  const { title, items, id, author, tags, handleSetSelectedItem } = props;

  return (
    <>
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
            items.map((item, i) => (
              <div
                key={i}
                className={styles.thumbnail}
                onClick={() => handleSetSelectedItem(item)}
              >
                {/* <Image
                  src={`${API_URL}/items/images/${item.imageID}`}
                  placeholder="blur"
                  layout="fill"
                  quality={100}
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(300, 200)
                  )}`}
                /> */}
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
