import Router from 'next/router';
import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import { logOutUser } from '../../auth/api/AuthApi';
import { useAppContext } from '../../components/AppWrapper';
import CreateItemForm from './CreateItemForm';
import Item from './Item';
import useCollectionsById from '../../hooks/useCollectionsById';
import useAllItems from '../../hooks/useAllItems';
import CreateModal from './CreateModal';
import CreateCollectionForm from '../../collections/CreateCollectionForm';

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
      <Link href={`/profile/${user._id}`}>
        <p>{user.name}</p>
      </Link>
      <button onClick={handleLogout}>logout</button>
      <CreateCollectionForm />
      <CreateItemForm
        {...{ email, name, _id }}
        collections={collectionsExist ? collections.data : []}
      />
      <CreateModal isOpen={true} />
      {itemsExist &&
        data.data.map((item: any) => {
          console.log('data.data: ', data.data);
          const isMyItem = user._id === item.userId;
          const isPublic = !item.isPrivate;
          console.log('item: ', item);
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
                imageID={item.imageID}
              />
            );
          }
        })}
    </section>
  );
};

export default Landing;
