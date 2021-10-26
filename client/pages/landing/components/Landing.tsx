import Router from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';

import { logOutUser } from '../../auth/api/AuthApi';
import { useAppContext } from '../../components/AppWrapper';
import { fetchCollectionsById } from '../../collections/api/CollectionsApi';
import { fetchAllItems } from '../api/ItemApi';
import CreateItemForm from './CreateItemForm';
import Item from './Item';
import useCollectionsById from '../../hooks/useCollectionsById';
import useAllItems from '../../hooks/useAllItems';

const Landing: NextPage = () => {
  const { user, authenticated, token } = useAppContext();
  const { email, name, _id } = !!user && user;
  const {
    data: collections,
    error: collectionsError,
    status: collectionsStatus,
  } = useCollectionsById(_id);

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

  const { data, error, status } = useAllItems();
  if (error) alert('something went wrong loading items');

  if (!authenticated || !user) {
    return (
      <p onClick={() => Router.push('/auth/components/Login')}>please login</p>
    );
  }
  const itemsExist = data && data.data && !!data.data.length;
  const collectionsExist =
    !collectionsError && collections && !!collections.data.length;
  return (
    <section>
      <p>you are authenticated</p>
      <p>{user.name}</p>
      <button onClick={handleLogout}>logout</button>
      <CreateItemForm
        {...{ email, name, _id }}
        collections={collectionsExist ? collections.data : []}
      />
      {itemsExist &&
        data.data.map((item: any) => {
          const isMyItem = user._id === item.userId;
          const isPublic = !item.isPrivate;

          if (isPublic || isMyItem) {
            return (
              <Item
                {...{ isMyItem }}
                key={item._id}
                author={item.author}
                name={item.name}
                _id={item._id}
                userId={item.userId}
                collections={item.collections}
                isPrivate={item.isPrivate}
                likes={item.likes}
                tags={item.tags}
                url={item.url}
                imageString={item.image}
              />
            );
          }
        })}
    </section>
  );
};

export default Landing;
