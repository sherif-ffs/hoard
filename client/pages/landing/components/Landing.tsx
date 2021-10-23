import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../components/AppWrapper';
import type { NextPage } from 'next';
import CreateItemForm from './CreateItemForm';

const Landing: NextPage = () => {
  const { user, authenticated, token } = useAppContext();
  const { collections, email, name, _id } = !!user && user;
  if (!authenticated || !user) {
    return (
      <p onClick={() => Router.push('/auth/components/Login')}>please login</p>
    );
  }

  return (
    <section>
      <p>you are authenticated</p>
      <p>items</p>
      <CreateItemForm {...{ collections, email, name, _id }} />
    </section>
  );
};

export default Landing;
