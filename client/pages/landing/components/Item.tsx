import React from 'react';
import { TagInterface } from '../../Interfaces/TagInterface';
import { deleteItem } from '../api/ItemApi';

type Props = {
  author: string;
  name: string;
  _id: string;
  userId: string;
  collectionId: string;
  isPrivate: string;
  likes: number;
  tags: Array<TagInterface>;
  url: string;
  isMyItem: boolean;
  imageString: string;
};

const Item = (props: Props) => {
  const {
    author,
    name,
    _id,
    collectionId,
    isPrivate,
    likes,
    tags,
    url,
    isMyItem,
    imageString,
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
  return (
    <figure
      style={{
        border: '1px solid black',
      }}
    >
      <p>{author}</p>
      <p>{name}</p>
      <p>{_id}</p>
      <p>{collectionId}</p>
      <p>{isPrivate}</p>
      <p>{likes}</p>
      {imageString && <img src={`data:image/jpeg;base64,${imageString}`}></img>}
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
