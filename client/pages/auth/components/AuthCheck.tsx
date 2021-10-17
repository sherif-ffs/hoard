import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../components/AppWrapper';
import type { NextPage } from 'next';
import {
  checkUserAuthentication,
  logOutUser,
  getAllUsers,
} from '../api/AuthApi';

import styles from './AuthCheck.module.scss';

const TestAuth: NextPage = () => {
  const { user, authenticated, token } = useAppContext();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    const response = await checkUserAuthentication();

    const data = await response.json();
    if (data.data.authenticated === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const loadAllUsers = async () => {
    const res = await getAllUsers();
    return await res.json();
  };

  useEffect(() => {
    checkAuth();
    loadAllUsers();
  }, []);

  const handleLogout = async () => {
    const response = await logOutUser();
    const JSONResponse = await response.json();
    const { data, error, status } = JSONResponse;

    if (error) {
      alert(error);
      return;
    }

    if (!error && status === 'ok' && !data.authenticated) {
      setLoggedIn(false);
    }
  };

  console.log('user: ', user);
  console.log('authenticated: ', authenticated);
  if (authenticated && user) {
    return (
      <section className={styles.wrapper}>
        <p>you are authenticated</p>
        {user.name}
        {user.email}
        <button onClick={handleLogout}>logout</button>
      </section>
    );
  } else {
    return <p>you must login</p>;
  }
};

export default TestAuth;
