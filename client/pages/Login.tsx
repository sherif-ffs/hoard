import React, { useState } from 'react';
import type { NextPage } from 'next'
import {useAppContext} from './components/AppWrapper';
import Router from 'next/router'

const Login: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user, setUser, token, setToken } = useAppContext();

  console.log('user: ', user)
  console.log('token: ', token)
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    console.log('password: ', password)
    console.log('email: ', email)

    const result = fetch('http://localhost:5000/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    result.then((res) => {
      res.json().then(data => {
        console.log('data: ', data)
        if (data.status !== 'error') {
          const { user, token } = data.data;
          console.log('user: ', user)
          if (user && token) {
            setUser(user)
            setToken(token)
            Router.push('/TestAuth')
          }
        }
      })
    })
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input className="username" type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input className="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Submit Form" />
      </form>
    </section>
  )
} 

export default Login