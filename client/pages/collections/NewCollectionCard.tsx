import React from 'react';
import Link from 'next/link';

import { API_URL } from '../../constants/ApiEndpoint';
import { ItemInterface } from '../../Interfaces/ItemInterface';
import loadUserById from '../../hooks/auth/loadUserById';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

import styles from './NewCollectionCard.module.scss';

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
  const { title, items, id, tags, handleSetSelectedItem, userId } = props;

  const response = loadUserById(userId);

  const { user, status, error } = response;

  if (status === 'loading') {
    return <Loading copy={'Loading'} />;
  }

  if (error) {
    return <Error />;
  }

  const authorName = user && user[0] && user[0].name;

  const browserWidth = window.innerWidth;
  const itemsToShow = browserWidth < 500 ? 2 : 4;

  const pluralize = (num: number) => {
    if (num > 1) {
      return 's';
    }

    return null;
  };

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
            <strong>{items && items.length}</strong> Webpages
          </h4>
          <ul>
            {tags &&
              tags.map((tag, i) => (
                <li key={tag}>
                  {tag}
                  {i !== (tags && tags.length - 1) ? ',' : null}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.thumbnails}>
          {items &&
            !!items.length &&
            items
              .slice(0, itemsToShow)
              .map((item: ItemInterface, i: number) => (
                <div
                  key={i}
                  className={styles.thumbnail}
                  onClick={() => handleSetSelectedItem(item)}
                >
                  <img src={`${API_URL}/items/images/${item.imageID}`} />
                </div>
              ))}
          {items.length > itemsToShow && (
            <Link href={`/collections/${id}`}>
              <div className={styles.moreItems}>
                <h1>
                  {items.length - itemsToShow} More Webpages
                  {pluralize(items.length - itemsToShow)}
                </h1>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default NewCollectionCard;
