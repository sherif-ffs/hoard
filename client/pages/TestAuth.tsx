import React, { useEffect } from "react";
import {useAppContext} from './components/AppWrapper';
import type { NextPage } from 'next'

const TestAuth: NextPage = () => {
  const { user, token } = useAppContext();

  console.log('user: ', user)
  console.log('token: ', token)

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
      </section>
    )
  }
}

export default TestAuth
