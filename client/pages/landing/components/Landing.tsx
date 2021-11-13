import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import { logOutUser } from '../../auth/api/AuthApi';
import { useAppContext } from '../../components/AppWrapper';
import Item from './Item';
import useCollectionsById from '../../hooks/useCollectionsById';
import useAllItems from '../../hooks/useAllItems';
import CreateModal from './CreateModal';
import { Navigation } from '../../navigation/components/Navigation';
import styles from './Landing.module.scss';

const Landing: NextPage = () => {
  const { user } = useAppContext();
  const { email, name, _id } = !!user && user;
  const {
    data: collections,
    error: collectionsError,
    status: collectionsStatus,
  } = useCollectionsById(_id);

  const { data, error, status } = useAllItems();
  if (error) alert('something went wrong loading items');

  const itemsExist = data && data.data && !!data.data.length;
  const collectionsExist =
    !collectionsError && collections && !!collections.data.length;
  return (
    <div>
      <CreateModal
        {...{ email, name, _id }}
        collections={collectionsExist ? collections.data : []}
      />
      <div className={styles.wrapper}>
        {itemsExist &&
          data.data.map((item: any) => {
            const isMyItem = user && user._id === item.userId;
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
                  imageID={item.imageID}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Landing;
