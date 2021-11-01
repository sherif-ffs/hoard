import React from 'react';
import { TagInterface } from '../../Interfaces/TagInterface';
import { deleteItem } from '../api/ItemApi';
import { API_URL } from '../../constants/ApiEndpoint';
import Link from 'next/link';

type Props = {
  author: string;
  name: string;
  _id: string;
  userId: string;
  collections: Array<{ title: string; value: string }>;
  isPrivate: string;
  likes: number;
  tags: Array<TagInterface>;
  url: string;
  isMyItem: boolean;
  imageString: string;
  imageID: string;
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
    isMyItem,
    collections,
    imageID,
    userId,
  } = props;

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
  console.log(API_URL);
  return (
    <figure
      style={{
        border: '1px solid black',
      }}
    >
      <Link href={`/profile/${userId}`}>
        <p>{author}</p>
      </Link>
      <p>{name}</p>
      <p>{_id}</p>
      <p>{isPrivate}</p>
      <p>{likes}</p>

      {imageID && <img src={`${API_URL}/items/images/${imageID}`}></img>}
      {collections &&
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
      {isMyItem && <button onClick={handleDeleteItem}>delete</button>}
    </figure>
  );
};

export default Item;
