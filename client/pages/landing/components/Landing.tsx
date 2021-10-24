import Router from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';

import { logOutUser } from '../../auth/api/AuthApi';
import { useAppContext } from '../../components/AppWrapper';
import { fetchAllItems } from '../api/ItemApi';
import CreateItemForm from './CreateItemForm';
import Item from './Item';

const Landing: NextPage = () => {
  const { user, authenticated, token } = useAppContext();
  const { collections, email, name, _id } = !!user && user;

  const handleLogout = async () => {
    const response = await logOutUser();
    const JSONResponse = await response.json();
    const { data, error, status } = JSONResponse;

    if (error) {
      alert(error);
      return;
    }

    if (!error && status === 'ok' && !data.authenticated) {
      Router.push('/auth/components/Login');
    }
  };

  const loadAllItems = async () => {
    const res = await fetchAllItems();
    return await res.json();
  };

  const { data, error, status } = useQuery('users', loadAllItems);
  if (error) alert('something went wrong loading items');

  if (!authenticated || !user) {
    return (
      <p onClick={() => Router.push('/auth/components/Login')}>please login</p>
    );
  }

  return (
    <section>
      <p>you are authenticated</p>
      <p>{user.name}</p>
      <button onClick={handleLogout}>logout</button>
      <CreateItemForm {...{ collections, email, name, _id }} />
      {data &&
        data.data &&
        !!data.data.length &&
        data.data.map((item: any) => {
          const isMyItem = user._id === item.userId;
          const isPublic = !item.isPrivate;
          console.log('user.id: ', user.id);
          console.log('item.userId: ', item.userId);
          if (isPublic || isMyItem) {
            return (
              <Item
                {...{ isMyItem }}
                key={item._id}
                author={item.author}
                name={item.name}
                _id={item._id}
                userId={item.userId}
                collectionId={item.collectionId}
                isPrivate={item.isPrivate}
                likes={item.likes}
                tags={item.tags}
                url={item.url}
              />
            );
          }
        })}
    </section>
  );
};

export default Landing;
