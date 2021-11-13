import React from 'react';
import { TagInterface } from '../../Interfaces/TagInterface';
import { deleteItem } from '../api/ItemApi';
import { API_URL } from '../../constants/ApiEndpoint';
import Link from 'next/link';
import styles from './Item.module.scss';
import { ItemInterface } from '../../Interfaces/ItemInterface';

type Props = {
  item: ItemInterface;
  isMyItem: boolean;
};

const Item = (props: Props) => {
  const {
    author,
    name,
    _id,
    isPrivate,
    likes,
    tags,
    url,
    collections,
    imageID,
    userId,
  } = props.item;

  const handleDeleteItem = async () => {
    const res = await deleteItem(_id);
    const response = await res.json();
    const { status, data } = response;
    if (status === 'ok') {
      alert('Item deleted successfully');
      return;
    }
    alert(data);
  };
  return (
    <div className={styles.wrapper}>
      {/* <Link href={`/profile/${userId}`}>
        <p>{author}</p>
      </Link>
      <p>{name}</p>
      <p>{_id}</p>
      <p>{isPrivate}</p>
      <p>{likes}</p> */}
      {/* <div className={styles.thumbnail}> */}
      {imageID ? <img src={`${API_URL}/items/images/${imageID}`}></img> : null}
      <p>{name}</p>
      <div className={styles.content}>
        {/* <div className={styles.tags}>
          {tags &&
            !!tags.length &&
            tags.map((tag, idx) => (
              <li key={idx} className={styles.tag}>
                {tag}
              </li>
            ))}
        </div> */}
        {props.isMyItem && <button onClick={handleDeleteItem}>delete</button>}
      </div>
      {/* </div> */}

      {/* {collections &&
        !!collections.length &&
        collections.map((collection) => (
          <li key={collection.id}>collection: {collection.title}</li>
        ))}
      {tags &&
        !!tags.length &&
        tags.map((tag, idx) => <li key={idx}>{tag}</li>)}
      <a href={url} target="_blank">
        {url}{' '}
      </a>
      {isMyItem && <button onClick={handleDeleteItem}>delete</button>} */}
    </div>
  );
};

export default Item;
