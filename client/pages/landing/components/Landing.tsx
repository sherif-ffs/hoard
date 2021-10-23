import Router from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';

import { useAppContext } from '../../components/AppWrapper';
import { fetchAllItems } from '../api/ItemApi';
import CreateItemForm from './CreateItemForm';
import Item from './Item';

const Landing: NextPage = () => {
  const { user, authenticated, token } = useAppContext();
  const { collections, email, name, _id } = !!user && user;

  const loadAllItems = async () => {
    const res = await fetchAllItems();
    return await res.json();
  };

  const { data, error, status } = useQuery('users', loadAllItems);
  if (error) alert('something went wrong loading items');

  console.log('data: ', data);
  console.log('error: ', error);
  console.log('status: ', status);

  if (!authenticated || !user) {
    return (
      <p onClick={() => Router.push('/auth/components/Login')}>please login</p>
    );
  }

  return (
    <section>
      <p>you are authenticated</p>
      <CreateItemForm {...{ collections, email, name, _id }} />
      {data &&
        data.data &&
        !!data.data.length &&
        data.data.map((item: any) => {
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
          } = item;
          return (
            <Item
              key={_id}
              {...{
                author,
                name,
                _id,
                userId,
                collectionId,
                isPrivate,
                likes,
                tags,
                url,
              }}
            />
          );
        })}
    </section>
  );
};

export default Landing;
