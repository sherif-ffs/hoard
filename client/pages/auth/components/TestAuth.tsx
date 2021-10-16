import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../components/AppWrapper';
import type { NextPage } from 'next';
import Router from 'next/router';
import {
  checkUserAuthentication,
  logOutUser,
  getAllUsers,
} from '../api/AuthApi';
import { useQuery } from 'react-query';

const TestAuth: NextPage = () => {
  const { user, token } = useAppContext();
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

  const { data, error, status } = useQuery('users', loadAllUsers);
  console.log('data: ', data);
  console.log('status: ', status);
  console.log('error: ', error);

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

  if (!loggedIn) {
    return <p>you must login</p>;
  } else {
    return (
      <section>
        <p>you are authenticated</p>
        <button onClick={handleLogout}>logout</button>
      </section>
    );
  }
};

export default TestAuth;
