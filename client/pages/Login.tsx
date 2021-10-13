import React, { useState } from 'react';
import type { NextPage } from 'next'

const Login: NextPage = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    console.log('password: ', password)
    console.log('username: ', username)

    const result = fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    result.then((res) => {
      console.log('res: ', res.json().then((d) => {
        console.log('d: ', d)
      }))
    })
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input className="username" type="text" placeholder="email" onChange={e => setUsername(e.target.value)} />
        <input className="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Submit Form" />
      </form>
    </section>
  )
} 

export default Login