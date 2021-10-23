import React, { useState } from 'react';
import { CollectionInterface } from '../../Interfaces/CollectionInterface';
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
};

const Item = (props: Props) => {
  const {
    author,
    name,
    _id,
    userId,
    collectionId,
    isPrivate,
    likes,
    tags,
    url,
  } = props;
  console.log('props: ', props);

  const handleDeleteItem = async () => {
    console.log('_id: ', _id);
    const res = await deleteItem(_id);
    const response = await res.json();
    console.log('response: ', response);
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
      <p>{tags[0].name}</p>
      <a href={url} target="_blank">
        {url}{' '}
      </a>
      <button onClick={handleDeleteItem}>delete</button>
    </figure>
  );
};

export default Item;
