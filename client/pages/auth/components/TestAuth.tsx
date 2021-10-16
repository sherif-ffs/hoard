import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../components/AppWrapper';
import type { NextPage } from 'next';
import Router from 'next/router';
import { checkUserAuthentication, logOutUser } from '../api/AuthApi';

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

  useEffect(() => {
    checkAuth();
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
