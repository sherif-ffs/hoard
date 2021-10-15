import React, { useEffect, useState } from "react";
import {useAppContext} from './components/AppWrapper';
import type { NextPage } from 'next'
import Router from 'next/router'

const TestAuth: NextPage = () => {
  const { user, token } = useAppContext();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    const result = await fetch('http://localhost:5000/api/checkAuth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }); 
    const data = await result.json()
    if (data.status === 'ok') {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    console.log('data; ', data)
  }

  useEffect(() => {
    checkAuth()
  }, []);

  const handleLogout = async () => {
    const result = await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    console.log('data: ', data)
    if (data.status === 'ok') Router.push('/Login')
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
