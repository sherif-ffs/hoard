import React, { useEffect, useState } from "react";
import { useAppContext } from './components/AppWrapper';
import type { NextPage } from 'next'
import Router from 'next/router'

const TestAuth: NextPage = () => {
  const { user, token } = useAppContext();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    const result = await fetch('http://localhost:5000/auth/checkAuth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }); 
    const data = await result.json();
    console.log('data.data.authenticated: ', data.data.authenticated);
    if (data.data.authenticated === true) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    const result = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    console.log('data: ', data)
    if (data.status === 'ok' && !data.data.authenticated) {
      setLoggedIn(false);
      // checkAuth();
    }
    // if (data.status === 'ok') Router.push('/Login')
  }

  if (!loggedIn) {
    return (
      <p>you must login</p>
    )
  } else {
    return (
      <section>
        <p>you are authenticated</p>
        <button onClick={handleLogout}>logout</button>
      </section>
    )
  }
}

export default TestAuth
