import React, { useEffect } from "react";
import {useAppContext} from './components/AppWrapper';
import type { NextPage } from 'next'
import Router from 'next/router'

const TestAuth: NextPage = () => {
  const { user, token } = useAppContext();

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
    // Router.push(result.url);
  }

  if (!user || !token) {
    return (
      <p>you must login</p>
    )
  } else {
    return (
      <section>
        <p>{user.name}</p>
        <p>{user.email}</p> 
        <p>you are authenticated</p>
        <button onClick={handleLogout}>logout</button>
      </section>
    )
  }
}

export default TestAuth
